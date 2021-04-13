import { inject, injectable } from "tsyringe";

import ICarsRepository from "@modules/Cars/repositories/ICarsRepository";
import Rental from "@modules/Rentals/infra/typeorm/entities/Rental";
import IRentalsRepository from "@modules/Rentals/repositories/IRentalsRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/appError";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    public async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const minimumHour = 24;

        const carUnvailable = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        );

        if (carUnvailable) {
            throw new AppError("Car is unavailable");
        }

        const rentalOpenToUse = await this.rentalsRepository.rentOpenToUser(
            user_id
        );
        if (rentalOpenToUse) {
            throw new AppError("There's a rental in progress for user!");
        }

        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date
        );

        if (compare < minimumHour) {
            throw new AppError("Invalid return time!");
        }
        const rental = await this.rentalsRepository.create({
            car_id,
            user_id,
            expected_return_date,
        });

        await this.carsRepository.updateAvailable(car_id, false);

        return rental;
    }
}
export default CreateRentalUseCase;
