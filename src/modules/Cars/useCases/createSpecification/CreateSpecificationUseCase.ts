/* eslint-disable import/no-unresolved */
import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "@modules/Cars/repositories/ISpecificationRepository";

import AppError from "../../../../shared/errors/appError";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationsRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadExists = await this.specificationRepository.findByName(
            name
        );

        if (specificationAlreadExists) {
            throw new AppError("Specification already exists!");
        }
        this.specificationRepository.create({ name, description });
    }
}
export default CreateSpecificationUseCase;
