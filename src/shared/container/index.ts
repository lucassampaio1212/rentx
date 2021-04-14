import { container } from "tsyringe";

import "@shared/container/providers/index";
import UsersRepository from "@modules/Accounts/infra/typeorm/repositories/UsersRepository";
import UsersTokensRepository from "@modules/Accounts/infra/typeorm/repositories/UsersTokenRepository";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import IUserTokensRepository from "@modules/Accounts/repositories/IUsersTokensRepository";
import CarsImageRepository from "@modules/Cars/infra/typeorm/repositories/CarsImageRepository";
import CarsRepository from "@modules/Cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/Cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/Cars/infra/typeorm/repositories/SpecificationRepository";
import ICarsImageRepository from "@modules/Cars/repositories/ICarsImageRepository";
import ICarsRepository from "@modules/Cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/Cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/Cars/repositories/ISpecificationRepository";
import RentalsRepository from "@modules/Rentals/infra/typeorm/repositories/RentalsRepository";
import IRentalsRepository from "@modules/Rentals/repositories/IRentalsRepository";

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

container.registerSingleton<ICarsImageRepository>(
    "CarsImagesRepository",
    CarsImageRepository
);
container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
);

container.registerSingleton<IUserTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
);
