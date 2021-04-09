import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/Cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/Cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/Cars/useCases/listCategories/ListCategoriesController";

import insureAdmin from "../middleware/InsureAdmin";
import ensureAuthenticated from "../middleware/InsureAuthenticate";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const importCategoryController = new ImportCategoryController();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
categoriesRoutes.post(
    "/",
    ensureAuthenticated,
    insureAdmin,
    createCategoryController.handle
);
categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.post(
    "/import",
    ensureAuthenticated,
    insureAdmin,
    upload.single("file"),
    importCategoryController.handle
);

export { categoriesRoutes };
