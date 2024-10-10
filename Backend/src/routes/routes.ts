import * as express from "express";
import { loginRouter } from "./loginRoutes";
import { userRouter } from "./userRoutes";

export const routes = express.Router();

routes.use(loginRouter);
routes.use(userRouter);