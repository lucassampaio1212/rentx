import { Request, Response } from "express";
import { container } from "tsyringe";

import ShowProfileUseCase from "./ShowProfileUseCase";

class ShowProfilerController {
    public async handle(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { id } = request.user;
        const profileUseCase = container.resolve(ShowProfileUseCase);

        const user = await profileUseCase.execute({
            user_id: id,
        });

        return response.json(user);
    }
}
export { ShowProfilerController };
