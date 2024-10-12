import { Router } from 'express';
import { permissionVerify } from '../middleware/permissionVerify';
import { chatController } from '../controller/chatController';

export const chatRouter = Router();

chatRouter.post('/', permissionVerify, chatController.handleChat);
