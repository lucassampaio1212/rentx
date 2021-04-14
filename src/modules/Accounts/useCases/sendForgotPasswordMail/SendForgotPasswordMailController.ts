import { Request, Response } from "express";
import { container } from "tsyringe";

import SendForgotPasswordMailUseCase from "./SendForgotPasswordEmailUseCase";

export default class SendForgotPasswordMailController {
    public async handle(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { email } = request.body;

        const sendForgotPasswordEmail = container.resolve(
            SendForgotPasswordMailUseCase
        );

        await sendForgotPasswordEmail.execute({
            email,
        });

        return response.status(204).json();
    }
}
