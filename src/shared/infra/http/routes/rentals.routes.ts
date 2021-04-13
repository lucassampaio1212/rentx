import { Router } from "express";

import CreateRentalController from "@modules/Rentals/useCases/createRentals/CreateRentalController";
import DevolutionRentalController from "@modules/Rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/Rentals/useCases/listRentalsByUser/LisrRentalsByUserController";

import ensureAuthenticated from "../middleware/InsureAuthenticate";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();
rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
    "/devolution/:id",
    ensureAuthenticated,
    devolutionRentalController.handle
);
rentalRoutes.get(
    "/user",
    ensureAuthenticated,
    listRentalsByUserController.handle
);

export default rentalRoutes;
