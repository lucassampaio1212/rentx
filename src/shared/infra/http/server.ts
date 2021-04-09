import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "../../container";
import AppError from "@shared/errors/appError";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import router from "./routes";

createConnection();
const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response
            .status(err.statusCode)
            .json({ status: "error", message: err.message });
    }
    console.error(err);
    return response
        .status(500)
        .json({ status: "error", message: "Internal server error" });
});

app.listen(3338, () => {
    console.log("🚀Server on port:3338");
});
