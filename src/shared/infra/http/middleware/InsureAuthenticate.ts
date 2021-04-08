import { NextFunction, Request, Response } from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import { verify } from "jsonwebtoken";

import authConfig from "../../../../config/authConfig";
// eslint-disable-next-line import/no-unresolved
import UsersRepository from "../../../../modules/Accounts/infra/typeorm/repositories/UsersRepository";
import AppError from "../../../errors/appError";

interface ITokenPayload {
    sub: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("JWT token is missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            authConfig.jwt.secret
        ) as ITokenPayload;

        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("user not found", 401);
        }
        request.user = {
            id: user_id,
        };
        return next();
    } catch {
        throw new AppError("Invalid JWT token", 401);
    }
}
