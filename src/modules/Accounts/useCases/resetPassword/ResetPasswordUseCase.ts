import { hash } from "bcryptjs";
import { addHours, isAfter } from "date-fns";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/Accounts/repositories/IUsersTokensRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/appError";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository
    ) {}

    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(
            token
        );

        if (!userToken) {
            throw new AppError("Token invalid!");
        }
        const tokenCreatedAt = userToken.created_at;

        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError("token expired");
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.usersTokensRepository.deleteById(userToken.id);
    }
}

export { ResetPasswordUserUseCase };
