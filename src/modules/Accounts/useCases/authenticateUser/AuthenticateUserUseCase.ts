import { compare } from "bcryptjs";
// eslint-disable-next-line import/no-extraneous-dependencies
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import authConfig from "@config/authConfig";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import IUserTokensRepository from "@modules/Accounts/repositories/IUsersTokensRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/appError";

interface IRequest {
    email: string;
    password: string;
}
interface IResponse {
    user: {
        name: string;
        email: string;
        isAdmin: boolean;
    };
    token: string;
    refresh_token: string;
}
@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUserTokensRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        // verificando se o email existe
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Incorrect Email/Passoword Combination.", 401);
        }
        // verificando se o password combina
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError("Incorrect Email/Passoword Combination.", 401);
        }
        const token = sign({}, authConfig.secret_token, {
            subject: user.id,
            expiresIn: authConfig.expires_in_token,
        });

        const refresh_token = sign({ email }, authConfig.secret_refresh_token, {
            subject: user.id,
            expiresIn: authConfig.expires_in_refresh_token,
        });

        const refresh_expires_token = this.dateProvider.addDays(30);

        await this.usersTokensRepository.create({
            user_id: user.id,
            expires_date: refresh_expires_token,
            refresh_token,
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            refresh_token,
        };
        return tokenReturn;
    }
}
export default AuthenticateUserUseCase;
