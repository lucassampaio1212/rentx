/* eslint-disable import/no-unresolved */
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import IStorageProvider from "@shared/container/providers/StorageProviders/IStorageProviders";

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}
    public async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (user.avatar) {
            await this.storageProvider.deleteFile(user.avatar, "Avatar");
        }
        await this.storageProvider.saveFile(avatar_file, "Avatar");

        user.avatar = avatar_file;

        await this.usersRepository.create(user);
    }
}
export default UpdateUserAvatarUseCase;
