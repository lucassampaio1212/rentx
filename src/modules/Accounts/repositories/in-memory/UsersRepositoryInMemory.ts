import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import User from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create(data: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name: data.name,
            email: data.email,
            password: data.password,
            driver_license: data.driver_license,
        });

        this.users.push(user);
    }
    async findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find((user) => user.email === email);

        return user;
    }
    async findById(id: string): Promise<User | undefined> {
        const user = this.users.find((user) => user.id === id);

        return user;
    }
}

export default UsersRepositoryInMemory;
