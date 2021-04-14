import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import IUserTokensRepository from "@modules/Accounts/repositories/IUsersTokensRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import IMailProvider from "@shared/container/providers/MailProvider/IMailProvider";
import AppError from "@shared/errors/appError";

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider,
        @inject("UsersTokensRepository")
        private userTokensRepository: IUserTokensRepository,
        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider
    ) {}
    async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);
        const templatePath = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "Emails",
            "ForgotPassword.hbs"
        );

        if (!user) {
            throw new AppError("User does not exists.");
        }
        const token = uuidV4();

        const expires_date = this.dateProvider.addHours(3);

        await this.userTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date,
        });

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_PASSWORD}${token}`,
        };
        await this.mailProvider.sendMail(
            email,
            "Recuperação de senha",
            variables,
            templatePath
        );
    }
}
export default SendForgotPasswordMailUseCase;
