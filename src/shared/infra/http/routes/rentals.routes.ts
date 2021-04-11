import { Router } from "express";

import CreateRentalController from "@modules/Rentals/useCases/createRentals/CreateRentalController";

import ensureAuthenticated from "../middleware/InsureAuthenticate";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);

export default rentalRoutes;
