import ICreateUserDTO from "modules/Accounts/dtos/ICreateUserDTO";

// eslint-disable-next-line import-helpers/order-imports
import AppError from "@errors/appError";

// eslint-disable-next-line import-helpers/order-imports
// eslint-disable-next-line import/no-unresolved

import UsersRepositoryInMemory from "@modules/Accounts/repositories/in-memory/UsersRepositoryInMemory";
import CreateUserUseCase from "@modules/Accounts/useCases/createUser/CreateUserUseCase";

import AuthenticateUserUseCase from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "1234567",
            email: "johndoe@email.com",
            password: "123456778",
            name: "Jhon Doe",
        };
        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
        expect(result).toHaveProperty("token");
    });
    it("should not be able to authenticate with a non existing user", async () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "12345",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
    it("should not be able to authenticate with wrong password", async () => {
        await usersRepositoryInMemory.create({
            driver_license: "1234567",
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123123",
        });
        await expect(
            authenticateUserUseCase.execute({
                email: "johndoe@example.com",
                password: "wrong-password",
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
