import { inject, injectable } from "tsyringe";

import Car from "@modules/Cars/infra/typeorm/entities/Car";
import ICarsRepository from "@modules/Cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/Cars/repositories/ISpecificationRepository";
import AppError from "@shared/errors/appError";

interface IRequest {
    car_id: string;
    specificatios_id: string[];
}

@injectable()
class CreateCarSpecificationsUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationsRepository: ISpecificationsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}
    async execute({ car_id, specificatios_id }: IRequest): Promise<Car> {
        const carsExists = await this.carsRepository.findById(car_id);

        if (!carsExists) {
            throw new AppError("car does not exist");
        }

        const specifications = await this.specificationsRepository.findByIds(
            specificatios_id
        );

        carsExists.specifications = specifications;

        return carsExists;
    }
}
export default CreateCarSpecificationsUseCase;
