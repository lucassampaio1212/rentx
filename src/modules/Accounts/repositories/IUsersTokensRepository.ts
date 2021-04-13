import ICreateUserTokenDTO from "../dtos/ICreateUserTokenDTO";
import UserToken from "../infra/typeorm/entities/UserToken";

export default interface IUserTokensRepository {
    create({
        user_id,
        expires_date,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserToken>;
    findByUserAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken>;
    deleteById(id: string): Promise<void>;
    findByRefreshToken(refresh_token: string): Promise<UserToken>;
}
