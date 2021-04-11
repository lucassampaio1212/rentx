import { inject, injectable } from "tsyringe";

// import CarImage from "@modules/Cars/infra/typeorm/entities/CarImage";
import ICarsImageRepository from "@modules/Cars/repositories/ICarsImageRepository";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarsImageUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private carsImageRepository: ICarsImageRepository
    ) {}
    public async execute({ car_id, images_name }: IRequest): Promise<void> {
        images_name.map(async (image) => {
            await this.carsImageRepository.create(car_id, image);
        });
    }
}

export default UploadCarsImageUseCase;
