import { classToClass } from "class-transformer";

import IUsersResponseDTO from "../dtos/IUsersResponseDTO";
import User from "../infra/typeorm/entities/User";

class UseMapper {
    static toDTO({
        email,
        name,
        id,
        avatar,
        driver_license,
        avatar_url,
    }: User): IUsersResponseDTO {
        const user = classToClass({
            email,
            name,
            id,
            avatar,
            driver_license,
            avatar_url,
        });
        return user;
    }
}
export { UseMapper };
