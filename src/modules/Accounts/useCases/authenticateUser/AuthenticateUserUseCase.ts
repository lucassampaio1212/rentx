/* eslint-disable import/no-unresolved */
import { compare } from "bcryptjs";
// eslint-disable-next-line import/no-extraneous-dependencies
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import authConfig from "@config/authConfig";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";

import AppError from "../../../../shared/errors/appError";
// eslint-disable-next-line import/no-extraneous-dependencies

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
}
@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
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
        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        };
        return tokenReturn;
    }
}
export default AuthenticateUserUseCase;
