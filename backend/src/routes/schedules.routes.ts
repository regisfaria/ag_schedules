import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateScheduleAvailabilityService from '../services/CreateScheduleAvailabilityService';
import CreateRestTimeService from '../services/CreateRestTimeService';
import CreateHolidayService from '../services/CreateHolidayService';

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

schedulesRouter.post('/rest', async (request, response) => {
  const { scheduleAvailabilityId, startTime, endTime } = request.body;

  const createRestTime = new CreateRestTimeService();

  const restTime = await createRestTime.execute({
    scheduleAvailabilityId,
    startTime,
    endTime,
  });

  return response.json(restTime);
});

schedulesRouter.post('/holiday', async (request, response) => {
  const { scheduleAvailabilityId, day } = request.body;

  const createHoliday = new CreateHolidayService();

  const holiday = await createHoliday.execute({
    scheduleAvailabilityId,
    day,
  });

  return response.json(holiday);
});

schedulesRouter.get('/', async (request, response) => {
  const schedulesRepository = getRepository(ScheduleAvailability);

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
