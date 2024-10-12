import { Router } from 'express';
import { loginController } from '../controller/loginController';

export const loginRouter = Router();

loginRouter.get('/auth/validate', loginController.validateToken);
loginRouter.post('/login', loginController.authenticate);
loginRouter.delete('/logout', loginController.logout);
