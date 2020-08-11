import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';

import CreateScheduleAvailabilityService from '../services/CreateScheduleAvailabilityService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import ScheduleAvailability from '../models/ScheduleAvailability';

const schedulesRouter = Router();

schedulesRouter.use(ensureAuthenticated);

schedulesRouter.post('/', async (request, response) => {
  const { specialistId } = request.body;

  const createScheduleAvailability = new CreateScheduleAvailabilityService();
  const scheduleAvailability = await createScheduleAvailability.execute(
    specialistId,
  );

  return response.json(scheduleAvailability);
});

schedulesRouter.get('/', async (request, response) => {
  const schedulesRepository = getCustomRepository(ScheduleAvailability);

  const schedules = await schedulesRepository.find();

  return response.json(schedules);
});

schedulesRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const schedulesRepository = getRepository(ScheduleAvailability);

  const schedule = await schedulesRepository.find({
    where: { specialistId: id },
  });

  return response.json(schedule);
});

export default schedulesRouter;
