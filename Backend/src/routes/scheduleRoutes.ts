import * as scheduleController from './../controller/scheduleController';
import * as express from "express";;
import { permissionVerify } from "../middleware/permissionVerify";

export const scheduleRouter = express.Router();

scheduleRouter.post("/", permissionVerify , scheduleController.createSchedule);