import { inject, injectable } from "tsyringe";

import Car from "@modules/Cars/infra/typeorm/entities/Car";
import ICarsRepository from "@modules/Cars/repositories/ICarsRepository";

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

@injectable()
class ListCarsAvailableUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}
    public async execute({
        category_id,
        brand,
        name,
    }: IRequest): Promise<Car[]> {
        const car = await this.carsRepository.findAvailable(
            category_id,
            brand,
            name
        );

        return car;
    }
}
export default ListCarsAvailableUseCase;
