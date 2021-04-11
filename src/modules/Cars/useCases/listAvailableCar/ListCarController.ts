import { Request, Response } from "express";
import { container } from "tsyringe";

import ListCarUseCase from "./ListCarsAvailableUseCase";

class ListCarsController {
    public async handle(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { name, brand, category_id } = request.query;
        const listCarsUseCase = container.resolve(ListCarUseCase);

        const cars = await listCarsUseCase.execute({
            name: name as string,
            brand: brand as string,
            category_id: category_id as string,
        });

        return response.status(200).json(cars);
    }
}
export default ListCarsController;
