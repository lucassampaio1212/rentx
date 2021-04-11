import CarsRepositoryInMemory from "@modules/Cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/Cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import AppError from "@shared/errors/appError";

import CreateCarSpecificationsUseCase from "./CreateCarSpecificationsUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationsUseCase;
let carsRepository: CarsRepositoryInMemory;
let specificationsRepository: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
    beforeEach(() => {
        specificationsRepository = new SpecificationsRepositoryInMemory();
        carsRepository = new CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationsUseCase(
            specificationsRepository,
            carsRepository
        );
    });

    it("should nto be able to add a new specification to a non-existent  car", async () => {
        expect(async () => {
            const car_id = "1234";
            const specificatios_id = ["54321"];

            await createCarSpecificationUseCase.execute({
                car_id,
                specificatios_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepository.create({
            name: "Car 1",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });

        const specification = await specificationsRepository.create({
            description: "Test",
            name: "Test",
        });

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specificatios_id: [specification.id],
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    });
});
