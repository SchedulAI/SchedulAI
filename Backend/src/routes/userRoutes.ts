import { Router } from "express";
import { userController } from "../controller/userController";

export const userRouter = Router();

userRouter.post("/create", userController.createNewUser);
userRouter.patch("/update/:id", userController.updateExistentUser);
