import { getRepository, Repository } from "typeorm";

import ICreateUserTokenDTO from "@modules/Accounts/dtos/ICreateUserTokenDTO";
import IUserTokensRepository from "@modules/Accounts/repositories/IUsersTokensRepository";

import UserToken from "../entities/UserToken";

class UsersTokensRepository implements IUserTokensRepository {
    private repository: Repository<UserToken>;

    constructor() {
        this.repository = getRepository(UserToken);
    }
    public async create({
        user_id,
        expires_date,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = this.repository.create({
            user_id,
            expires_date,
            refresh_token,
        });

        await this.repository.save(userToken);

        return userToken;
    }

    public async findByUserAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken> {
        const usersToken = await this.repository.findOne({
            user_id,
            refresh_token,
        });

        return usersToken;
    }
    public async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }
    async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        const userToken = await this.repository.findOne({ refresh_token });

        return userToken;
    }
}
export default UsersTokensRepository;
