import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import carsRoutes from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import passwordRouter from "./password.routes";
import rentalRoutes from "./rentals.routes";
import { specificationRoutes } from "./specification.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use(authenticateRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalRoutes);
router.use("/password", passwordRouter);
export default router;
