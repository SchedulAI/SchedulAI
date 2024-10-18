import { Router } from 'express';
import { invitesController } from '../controller/invitesController';


export const inviteRouter = Router();

inviteRouter.post('/create', invitesController.createInvite);

