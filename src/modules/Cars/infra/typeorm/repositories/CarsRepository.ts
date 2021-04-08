import { getRepository, Repository } from "typeorm";

import ICreateCarDTO from "@modules/Cars/dtos/ICreateCarDTO";
import ICarsRepository from "@modules/Cars/repositories/ICarsRepository";

import Car from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;
    constructor() {
        this.repository = getRepository(Car);
    }
    public async create({
        name,
        description,
        license_plate,
        daily_rate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            license_plate,
            daily_rate,
            fine_amount,
            brand,
            category_id,
        });

        await this.repository.save(car);
        return car;
    }
    public async findyByPlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne(license_plate);

        return car;
    }
}
export default CarsRepository;
