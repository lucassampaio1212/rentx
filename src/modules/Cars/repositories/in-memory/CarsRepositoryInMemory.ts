import ICreateCarDTO from "@modules/Cars/dtos/ICreateCarDTO";
import Car from "@modules/Cars/infra/typeorm/entities/Car";

import ICarsRepository from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    car: Car[] = [];
    public async create({
        name,
        description,
        brand,
        category_id,
        id,
        license_plate,
        fine_amount,
        daily_rate,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            brand,
            category_id,
            id,
            license_plate,
            fine_amount,
            daily_rate,
        });

        this.car.push(car);

        return car;
    }
    public async findyByPlate(license_plate: string): Promise<Car> {
        const plate = this.car.find(
            (plate) => plate.license_plate === license_plate
        );

        return plate;
    }
    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const all = this.car.filter((car) => {
            if (
                car.available === true ||
                (brand && car.brand === brand) ||
                (category_id && car.category_id === category_id) ||
                (name && car.name === name)
            ) {
                return car;
            }
            return null;
        });

        return all;
    }
    async findById(car_id: string): Promise<Car> {
        const car = this.car.find((car) => car.id === car_id);

        return car;
    }
    async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = this.car.findIndex((car) => car.id === id);
        this.car[findIndex].available = available;
    }
}
export default CarsRepositoryInMemory;
