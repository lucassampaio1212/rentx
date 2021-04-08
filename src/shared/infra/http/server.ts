import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import "../../container";
import "../typeorm";

// eslint-disable-next-line import/no-unresolved

import swaggerFile from "../../../swagger.json";
import AppError from "../../errors/appError";
import router from "./routes";

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
