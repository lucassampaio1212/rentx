import { Router } from "express";

import CreateCarController from "@modules/Cars/useCases/createCar/CreateCarController";

import insureAdmin from "../middleware/InsureAdmin";
import ensureAuthenticated from "../middleware/InsureAuthenticate";

const carsRoutes = Router();

const createCarController = new CreateCarController();
carsRoutes.post(
    "/",
    ensureAuthenticated,
    insureAdmin,
    createCarController.handle
);

export default carsRoutes;
