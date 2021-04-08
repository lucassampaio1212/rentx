import Specification from "@modules/Cars/infra/typeorm/entities/Specification";

interface ISpecificationRepositoryDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create({ name, description }: ISpecificationRepositoryDTO): Promise<void>;
    findByName(name: string): Promise<Specification | undefined>;
}
export { ISpecificationsRepository, ISpecificationRepositoryDTO };
