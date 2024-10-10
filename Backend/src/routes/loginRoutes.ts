import * as express from "express";
import { authenticate } from "../controller/loginController";
import asyncHandler from "../middleware/asyncHandle";

export const loginRouter = express.Router();

loginRouter.post("/login", asyncHandler(authenticate));