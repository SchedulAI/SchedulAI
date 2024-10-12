import { Router } from "express";
import { loginController } from "../controller/loginController";

export const loginRouter = Router();

loginRouter.post("/login", loginController.authenticate);
loginRouter.delete("/logout", loginController.logout);
