import { container } from "tsyringe";

import UsersRepository from "@modules/Accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import CarsRepository from "@modules/Cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/Cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/Cars/infra/typeorm/repositories/SpecificationRepository";
import ICarsRepository from "@modules/Cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/Cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/Cars/repositories/ISpecificationRepository";

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
