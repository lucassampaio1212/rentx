import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

// eslint-disable-next-line import/no-unresolved
import ICreateUserDTO from "@modules/Accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";

import AppError from "../../../../shared/errors/appError";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    public async execute({
        name,
        password,
        email,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const checkUsersExists = await this.usersRepository.findByEmail(email);

        if (checkUsersExists) {
            throw new AppError("Email address already used.");
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name,
            password: passwordHash,
            email,
            driver_license,
        });
    }
}
export default CreateUserUseCase;
