import { Router } from "express";

import CreateSpecificationController from "@modules/Cars/useCases/createSpecification/CreateSpecificationController";

import insureAdmin from "../middleware/InsureAdmin";
import ensureAuthenticated from "../middleware/InsureAuthenticate";
import { authenticateRoutes } from "./authenticate.routes";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post(
    "/",
    ensureAuthenticated,
    insureAdmin,
    createSpecificationController.handle
);

export { specificationRoutes };
