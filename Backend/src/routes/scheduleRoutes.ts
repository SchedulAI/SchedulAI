import { Router } from 'express';
import { permissionVerify } from '../middleware/permissionVerify';
import { scheduleController } from '../controller/scheduleController';

export const scheduleRouter = Router();

scheduleRouter.post('/', permissionVerify, scheduleController.createSchedule);
scheduleRouter.patch(
  '/:scheduleId/cancel',
  permissionVerify,
  scheduleController.cancelSchedule
);

scheduleRouter.post(
  '/:scheduleId/invites',
  permissionVerify,
  scheduleController.createInvite
);
