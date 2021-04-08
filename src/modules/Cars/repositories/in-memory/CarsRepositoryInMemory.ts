import ICreateCarDTO from "@modules/Cars/dtos/ICreateCarDTO";
import Car from "@modules/Cars/entities/Car";

import ICarsRepository from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    car: Car[] = [];

    public async create(data: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            data,
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
}
export default CarsRepositoryInMemory;
