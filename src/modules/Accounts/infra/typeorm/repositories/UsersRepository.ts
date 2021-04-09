import { getRepository, Repository } from "typeorm";

import ICreateUserDTO from "@modules/Accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";

import User from "../entities/User";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }
    public async create({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            password,
            driver_license,
        });

        await this.repository.save(user);
    }
    public async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });

        return user;
    }
    public async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({ id });

        return user;
    }
}
export default UsersRepository;
