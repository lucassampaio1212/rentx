import Specification from "@modules/Cars/infra/typeorm/entities/Specification";

import ICreateSpecificationDTO from "../dtos/ICreateSpecificationDTO";

interface ISpecificationsRepository {
    create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification | undefined>;
    findByIds(ids: string[]): Promise<Specification[]>;
}
export { ISpecificationsRepository };
