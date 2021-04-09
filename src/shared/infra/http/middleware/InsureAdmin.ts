import { NextFunction, Request, Response } from "express";

import UsersRepository from "@modules/Accounts/infra/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/appError";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function insureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.user;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    if (!user.isAdmin) {
        throw new AppError("User is not an administrator.");
    }
    next();
}
