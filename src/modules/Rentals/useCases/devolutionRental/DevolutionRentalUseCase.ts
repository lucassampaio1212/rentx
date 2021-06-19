import { inject, injectable } from "tsyringe";

import ICarsRepository from "@modules/Cars/repositories/ICarsRepository";
import Rental from "@modules/Rentals/infra/typeorm/entities/Rental";
import IRentalsRepository from "@modules/Rentals/repositories/IRentalsRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/appError";

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
export default class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) {}

    public async execute({ id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id);
        const minimum_daily = 1;
        const car = await this.carsRepository.findById(rental.car_id);
        if (!rental) {
            throw new AppError("Rental Not Found.");
        }

        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.dateNow()
        );

        if (daily <= 0) {
            daily = minimum_daily;
        }

        const delay = this.dateProvider.compareInDays(
            dateNow,
            rental.expected_return_date
        );

        let total = 0;

        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);

        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }
}
