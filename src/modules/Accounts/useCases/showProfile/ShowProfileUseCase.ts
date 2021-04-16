import { injectable, inject } from "tsyringe";

import IUsersResponseDTO from "@modules/Accounts/dtos/IUsersResponseDTO";
import { UseMapper } from "@modules/Accounts/mappers/useMapper";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import AppError from "@shared/errors/appError";

interface IRequest {
    user_id: string;
}

@injectable()
class ShowProfileUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    public async execute({ user_id }: IRequest): Promise<IUsersResponseDTO> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User not found");
        }

        return UseMapper.toDTO(user);
    }
}

export default ShowProfileUseCase;
