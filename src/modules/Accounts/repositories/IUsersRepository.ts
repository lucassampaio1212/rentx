import ICreateUserDTO from "@modules/Accounts/dtos/ICreateUserDTO";
import User from "@modules/Accounts/entities/User";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
}

export { IUsersRepository };
