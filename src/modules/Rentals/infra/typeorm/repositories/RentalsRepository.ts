import { getRepository, Repository } from "typeorm";

import ICreateRentalDTO from "@modules/Rentals/dtos/ICreateRentalDTO";
import IRentalsRepository from "@modules/Rentals/repositories/IRentalsRepository";

import Rental from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne(id);
        return rental;
    }
    async findByUser(user_id: string): Promise<Rental[]> {
        const rentals = await this.repository.find({
            where: { user_id },
            relations: ["car"],
        });

        return rentals;
    }
    async rentOpenToUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOne({ user_id });

        return openByUser;
    }
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne({ car_id });

        return openByCar;
    }
    async create({
        id,
        car_id,
        user_id,
        expected_return_date,
        end_date,
        total,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            id,
            car_id,
            user_id,
            expected_return_date,
            end_date,
            total,
        });

        await this.repository.save(rental);

        return rental;
    }
}
export default RentalsRepository;
