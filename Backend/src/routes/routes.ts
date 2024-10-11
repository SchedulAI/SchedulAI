import express from "express";
import { loginRouter } from "./loginRoutes";
import { userRouter } from "./userRoutes";
import { scheduleRouter } from "./scheduleRoutes";

export const routes = express.Router();

routes.use(loginRouter);
routes.use(userRouter);
routes.use("/schedule", scheduleRouter)