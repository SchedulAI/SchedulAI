import * as dialogController from './../controller/dialogController';
import * as express from "express";;
import { permissionVerify } from "../middleware/permissionVerify";

export const dialogRoutes = express.Router();

dialogRoutes.get("/:dialog_id/messages", permissionVerify , dialogController.getMessagesByDialogId);