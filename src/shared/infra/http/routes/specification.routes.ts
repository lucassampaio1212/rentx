import { Router } from "express";

import CreateSpecificationController from "@modules/Cars/useCases/createSpecification/CreateSpecificationController";

import ensureAdmin from "../middleware/InsureAdmin";
import ensureAuthenticated from "../middleware/InsureAuthenticate";
import { authenticateRoutes } from "./authenticate.routes";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createSpecificationController.handle
);

export { specificationRoutes };
