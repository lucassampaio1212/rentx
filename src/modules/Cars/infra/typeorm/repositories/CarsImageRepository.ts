import { getRepository, Repository } from "typeorm";

import ICarsImageRepository from "@modules/Cars/repositories/ICarsImageRepository";

import CarImage from "../entities/CarImage";

class CarsImageRepository implements ICarsImageRepository {
    private repository: Repository<CarImage>;

    constructor() {
        this.repository = getRepository(CarImage);
    }

    public async create(car_id: string, image_name: string): Promise<CarImage> {
        const carsImage = this.repository.create({
            car_id,
            image_name,
        });

        await this.repository.save(carsImage);

        return carsImage;
    }
}
export default CarsImageRepository;
