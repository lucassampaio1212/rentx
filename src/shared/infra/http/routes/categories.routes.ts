import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../../../../modules/Cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../../../../modules/Cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../../../../modules/Cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const importCategoryController = new ImportCategoryController();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
categoriesRoutes.post("/", createCategoryController.handle);
categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.post(
    "/import",
    upload.single("file"),
    importCategoryController.handle
);

export { categoriesRoutes };