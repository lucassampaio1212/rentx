/* eslint-disable import/no-unresolved */
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/Cars/repositories/ICategoriesRepository";
import AppError from "@shared/errors/appError";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}
    public async execute({ name, description }: IRequest): Promise<void> {
        const categoryExists = await this.categoriesRepository.findByName(name);

        if (categoryExists) {
            throw new AppError("Category already exists!");
        }

        const newCategory = await this.categoriesRepository.create({
            name,
            description,
        });

        return newCategory;
    }
}
export default CreateCategoryUseCase;
