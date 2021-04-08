import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCategoryUseCase from "@modules/Cars/useCases/createCategory/CreateCategoryUseCase";

class CreateCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        const createUserCategoryUseCase = container.resolve(
            CreateCategoryUseCase
        );

        await createUserCategoryUseCase.execute({ name, description });

        return response.status(201).send();
    }
}
export { CreateCategoryController };
