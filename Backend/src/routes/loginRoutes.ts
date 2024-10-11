import * as express from "express";
import * as loginController from "../controller/loginController";

export const loginRouter = express.Router();

loginRouter.post("/login", loginController.authenticate);
loginRouter.delete("/logout", loginController.logout)