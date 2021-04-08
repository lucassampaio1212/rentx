import { container } from "tsyringe";

import ICarsRepository from "@modules/Cars/repositories/ICarsRepository";

import UsersRepository from "../../modules/Accounts/infra/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/Accounts/repositories/IUsersRepository";
import CarsRepository from "../../modules/Cars/infra/repositories/CarsRepository";
import { CategoriesRepository } from "../../modules/Cars/infra/repositories/CategoriesRepository";
import { SpecificationRepository } from "../../modules/Cars/infra/repositories/SpecificationRepository";
import { ICategoriesRepository } from "../../modules/Cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "../../modules/Cars/repositories/ISpecificationRepository";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationRepository",
    SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);
container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
