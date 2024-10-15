import { Router } from 'express';
import { permissionVerify } from '../middleware/permissionVerify';
import { scheduleController } from '../controller/scheduleController';
import { availabilityController } from '../controller/availabilityController';
import { proposedDateController } from '../controller/proposedDateController';

export const scheduleRouter = Router();

// Parte da gestão do Próprio Schedule
scheduleRouter.post('/', permissionVerify, scheduleController.createSchedule);

scheduleRouter.patch(
  '/:scheduleId/cancel',
  permissionVerify,
  scheduleController.cancelSchedule
);

// Parte da gestão dos Invites
scheduleRouter.post(
  '/:scheduleId/invites',
  permissionVerify,
  scheduleController.createInvite
);

scheduleRouter.patch(
  '/:scheduleId/invites',
  permissionVerify,
  scheduleController.updateInviteStatus
);

// Parte da gestão das Availabilities
scheduleRouter.get(
  '/:scheduleId/availabilities',
  permissionVerify,
  availabilityController.getAllAvailabilities
);

scheduleRouter.get(
  '/:scheduleId/availability/:availabilityId',
  permissionVerify,
  availabilityController.getAvailability
);

scheduleRouter.post(
  '/:scheduleId/availability',
  permissionVerify,
  availabilityController.createAvailability
);

scheduleRouter.patch(
  '/:scheduleId/availability/:availabilityId',
  permissionVerify,
  availabilityController.updateAvailability
);

scheduleRouter.delete(
  '/:scheduleId/availability/:availabilityId',
  permissionVerify,
  availabilityController.deleteAvailability
);

// Parte da gestão das Proposed Dates
scheduleRouter.get(
  '/:scheduleId/proposed',
  permissionVerify,
  proposedDateController.getProposedDate
);

scheduleRouter.post(
  '/:scheduleId/proposed',
  permissionVerify,
  proposedDateController.createProposedDate
);

scheduleRouter.patch(
  '/:scheduleId/proposed',
  permissionVerify,
  proposedDateController.updateProposedDate
);
