import * as express from 'express';
import { createNewUser } from '../controller/userController';
import asyncHandler from '../middleware/asyncHandle';

export const userRouter = express.Router();

userRouter.post('/create', asyncHandler(createNewUser));