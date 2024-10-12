import { Router } from "express";
import { permissionVerify } from "../middleware/permissionVerify";
import { dialogController } from "../controller/dialogController";

export const dialogRoutes = Router();

dialogRoutes.get(
    "/:dialog_id/messages",
    permissionVerify,
    dialogController.getMessages
);

dialogRoutes.post("/create", permissionVerify, dialogController.getMessages);
