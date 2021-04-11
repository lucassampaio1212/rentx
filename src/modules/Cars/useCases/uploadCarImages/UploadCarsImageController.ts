import { Request, Response } from "express";
import { container } from "tsyringe";

import UploadCarsImageUseCase from "./UploadCarImagesUseCase";

interface IFiles {
    filename: string;
}

class UploadCarsImageController {
    public async handle(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { id } = request.params;
        const images = request.files as IFiles[];

        const uploadCarsImageUseCase = container.resolve(
            UploadCarsImageUseCase
        );

        const images_name = images.map((file) => file.filename);

        await uploadCarsImageUseCase.execute({
            car_id: id,
            images_name,
        });

        return response.status(201).send();
    }
}
export default UploadCarsImageController;
