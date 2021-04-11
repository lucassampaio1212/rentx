import ICreateRentalDTO from "../dtos/ICreateRentalDTO";
import Rental from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
    findById(id: string): Promise<Rental>;
    findByUser(user_id: string): Promise<Rental[]>;
    create(data: ICreateRentalDTO): Promise<Rental>;
    rentOpenToUser(user_id: string): Promise<Rental>;
    findOpenRentalByCar(car_id: string): Promise<Rental>;
}
export default IRentalsRepository;
