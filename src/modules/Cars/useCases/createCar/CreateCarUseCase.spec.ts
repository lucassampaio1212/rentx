import AppError from "@errors/appError";
import CarsRepositoryInMemory from "@modules/Cars/repositories/in-memory/CarsRepositoryInMemory";

import CreateCarUseCase from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a car", async () => {
        const car = await createCarUseCase.execute({
            name: "new car",
            description: "description car",
            daily_rate: 11111,
            license_plate: "12121212",
            fine_amount: 45.0,
            brand: "brand",
            category_id: "category",
        });

        expect(car).toHaveProperty("id");
    });
    it("It should not be able possible to register a new car with the same license plate", async () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "car1",
                description: "description car",
                daily_rate: 11111,
                license_plate: "ABC 1234",
                fine_amount: 45.0,
                brand: "brand",
                category_id: "category",
            });
            await createCarUseCase.execute({
                name: "car2",
                description: "description car",
                daily_rate: 11111,
                license_plate: "ABC 1234",
                fine_amount: 45.0,
                brand: "brand",
                category_id: "category",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
    it("Should be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "car4",
            description: "description car",
            daily_rate: 11111,
            license_plate: "ABCD 1234",
            fine_amount: 45.0,
            brand: "brand",
            category_id: "category",
        });
        expect(car.available).toBe(true);
    });
});
