import { getRepository, Repository } from "typeorm";

import {
    ISpecificationRepositoryDTO,
    ISpecificationsRepository,
} from "@modules/Cars/repositories/ISpecificationRepository";

import Specification from "../entities/Specification";

class SpecificationRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;
    constructor() {
        this.repository = getRepository(Specification);
    }
    public async create({
        name,
        description,
    }: ISpecificationRepositoryDTO): Promise<void> {
        const specification = this.repository.create({
            name,
            description,
        });
        await this.repository.save(specification);
    }
    public async findByName(name: string): Promise<Specification | undefined> {
        const specification = await this.repository.findOne({ name });

        return specification;
    }
}
export { SpecificationRepository };
