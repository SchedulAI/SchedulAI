import { Router } from 'express';
import { permissionVerify } from '../middleware/permissionVerify';
import { scheduleController } from '../controller/scheduleController';
import { availabilityController } from '../controller/availabilityController';
import { proposedDateController } from '../controller/proposedDateController';
import { invitesController } from '../controller/invitesController';

export const scheduleRouter = Router();

// Parte da gestão do Próprio Schedule
scheduleRouter.post('/', permissionVerify, scheduleController.createSchedule);

scheduleRouter.get('/', permissionVerify, scheduleController.getSchedules);

scheduleRouter.get(
  '/:scheduleId/',
  permissionVerify,
  scheduleController.getSchedule
);

scheduleRouter.patch(
  '/:scheduleId/cancel',
  permissionVerify,
  scheduleController.cancelSchedule
);

scheduleRouter.patch(
  '/:scheduleId',
  permissionVerify,
  scheduleController.updateScheduleInfo
);

// Parte da gestão dos Invites
scheduleRouter.post(
  '/:scheduleId/invites',
  permissionVerify,
  invitesController.createInvite
);

scheduleRouter.patch(
  '/:scheduleId/invites',
  permissionVerify,
  invitesController.updateInviteStatus
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
