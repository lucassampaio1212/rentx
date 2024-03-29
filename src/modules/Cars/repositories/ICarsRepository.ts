import ICreateCarDTO from "@modules/Cars/dtos/ICreateCarDTO";
import Car from "@modules/Cars/infra/typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findyByPlate(license_plate: string): Promise<Car>;
    findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]>;
    findById(id: string): Promise<Car>;
    updateAvailable(id: string, available: boolean): Promise<void>;
}
export default ICarsRepository;
