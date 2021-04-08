import ICreateCarDTO from "@modules/Cars/dtos/ICreateCarDTO";
import Car from "@modules/Cars/entities/Car";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findyByPlate(license_plate: string): Promise<Car>;
}
export default ICarsRepository;
