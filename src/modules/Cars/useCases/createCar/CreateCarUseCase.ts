import { inject, injectable } from "tsyringe";

import Car from "@modules/Cars/infra/typeorm/entities/Car";
import ICarsRepository from "@modules/Cars/repositories/ICarsRepository";
import AppError from "@shared/errors/appError";

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

@injectable()
class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}
    async execute({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: IRequest): Promise<Car> {
        const plateExists = await this.carsRepository.findyByPlate(
            license_plate
        );
        if (plateExists) {
            throw new AppError("License_plate already exists.");
        }
        const car = this.carsRepository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });
        return car;
    }
}
export default CreateCarUseCase;
