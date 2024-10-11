import express from "express";
import * as chatController from './../controller/chatController';
import { permissionVerify } from "../middleware/permissionVerify";

export const chatRouter = express.Router();

chatRouter.post("/", permissionVerify, chatController.handleChat);