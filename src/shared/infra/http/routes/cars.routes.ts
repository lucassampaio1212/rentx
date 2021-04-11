import { Router } from "express";
import multer from "multer";

import CreateCarController from "@modules/Cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/Cars/useCases/CreateCarSpecifications/CreateCarSpecificationsController";
import ListCarsController from "@modules/Cars/useCases/listAvailableCar/ListCarController";
import UploadCarsImageController from "@modules/Cars/useCases/uploadCarImages/UploadCarsImageController";

import uploadConfig from "../../../../config/upload";
import ensureAdmin from "../middleware/InsureAdmin";
import ensureAuthenticated from "../middleware/InsureAuthenticate";

const carsRoutes = Router();

const uploadCarsImages = multer(uploadConfig.upload("./tmp/cars"));

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationsController = new CreateCarSpecificationController();
const uploadCarsImageController = new UploadCarsImageController();
carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);
carsRoutes.get("/available", listCarsController.handle);
carsRoutes.post(
    "/specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationsController.handle
);

carsRoutes.post(
    "/images/:id",
    ensureAuthenticated,
    ensureAdmin,
    uploadCarsImages.array("images"),
    uploadCarsImageController.handle
);

export default carsRoutes;
