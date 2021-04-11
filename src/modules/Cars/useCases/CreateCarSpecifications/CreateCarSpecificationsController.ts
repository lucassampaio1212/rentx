import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCarSpecificationsUseCase from "./CreateCarSpecificationsUseCase";

class CreateCarSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { specificatios_id } = request.body;

        const createCarSpecificationUseCase = container.resolve(
            CreateCarSpecificationsUseCase
        );

        const car = await createCarSpecificationUseCase.execute({
            car_id: id,
            specificatios_id,
        });

        return response.json(car);
    }
}

export { CreateCarSpecificationController };
