// eslint-disable-next-line import/no-extraneous-dependencies
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import authConfig from "@config/authConfig";
import IUserTokensRepository from "@modules/Accounts/repositories/IUsersTokensRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/appError";

interface IPayload {
    sub: string;
    email: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUserTokensRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) {}
    public async execute(token: string): Promise<string> {
        const { email, sub } = verify(
            token,
            authConfig.secret_refresh_token
        ) as IPayload;

        const user_id = sub;

        const userToken = await this.usersTokensRepository.findByUserAndRefreshToken(
            user_id,
            token
        );

        if (!userToken) {
            throw new AppError("Refresh Token Does Not Existis.");
        }
        await this.usersTokensRepository.deleteById(userToken.id);

        const refresh_token = sign({ email }, authConfig.secret_refresh_token, {
            subject: sub,
            expiresIn: authConfig.expires_in_refresh_token,
        });

        const expires_date = this.dateProvider.addDays(
            authConfig.expires_refresh_token_days
        );

        await this.usersTokensRepository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        return refresh_token;
    }
}
export default RefreshTokenUseCase;
