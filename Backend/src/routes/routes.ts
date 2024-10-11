import express from "express";
import { loginRouter } from "./loginRoutes";
import { userRouter } from "./userRoutes";
import { chatRouter } from "./chatRoutes";
import { scheduleRouter } from "./scheduleRoutes";

export const routes = express.Router();

routes.use(loginRouter);
routes.use("/user", userRouter);
routes.use("/chat", chatRouter)
routes.use("/schedule", scheduleRouter)