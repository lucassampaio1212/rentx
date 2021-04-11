import { getRepository, Repository } from "typeorm";

import ICreateSpecificationDTO from "@modules/Cars/dtos/ICreateSpecificationDTO";
import { ISpecificationsRepository } from "@modules/Cars/repositories/ISpecificationRepository";

import Specification from "../entities/Specification";

class SpecificationRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;
    constructor() {
        this.repository = getRepository(Specification);
    }
    public async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            name,
            description,
        });
        await this.repository.save(specification);

        return specification;
    }
    public async findByName(name: string): Promise<Specification | undefined> {
        const specification = await this.repository.findOne({ name });

        return specification;
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids);
        return specifications;
    }
}
export { SpecificationRepository };
