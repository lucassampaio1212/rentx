import { Router } from "express";
import multer from "multer";

import CreateUserController from "@modules/Accounts/useCases/createUser/CreateUserController";
import { ShowProfilerController } from "@modules/Accounts/useCases/showProfile/ShowProfileController";
import UpdateUserAvatarController from "@modules/Accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

import uploadConfig from "../../../../config/upload";
import ensureAuthenticated from "../middleware/InsureAuthenticate";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileController = new ShowProfilerController();
const uploadAvatar = multer(uploadConfig);

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);
usersRoutes.get("/profile", ensureAuthenticated, profileController.handle);
export { usersRoutes };
