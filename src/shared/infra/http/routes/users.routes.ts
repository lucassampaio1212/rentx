import { Router } from "express";
import multer from "multer";

import CreateUserController from "@modules/Accounts/useCases/createUser/CreateUserController";
import UpdateUserAvatarController from "@modules/Accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

import uploadConfig from "../../../../config/upload";
import ensureAuthenticated from "../middleware/InsureAuthenticate";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

export { usersRoutes };
