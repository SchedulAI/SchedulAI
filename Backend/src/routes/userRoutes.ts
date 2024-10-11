import * as express from 'express';
import { createNewUser } from '../controller/userController';

export const userRouter = express.Router();

userRouter.post('/create', createNewUser);