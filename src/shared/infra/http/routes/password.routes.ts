import { Router } from "express";

import { ResetPasswordUserController } from "@modules/Accounts/useCases/resetPassword/ResetPasswordController";
import { SendForgotPasswordMailController } from "@modules/Accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRouter = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();
passwordRouter.post("/forgot", sendForgotPasswordMailController.handle);
passwordRouter.post("/reset", resetPasswordUserController.handle);
export default passwordRouter;
