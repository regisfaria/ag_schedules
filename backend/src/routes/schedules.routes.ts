import { Router } from 'express';
import { getRepository } from 'typeorm';

import ScheduleAvailability from '../models/ScheduleAvailability';
import Holiday from '../models/Holiday';

import CreateScheduleAvailabilityService from '../services/Schedules/CreateScheduleAvailabilityService';
import UpdateScheduleService from '../services/Schedules/UpdateScheduleService';
import ListAvailableDays from '../services/Schedules/ListAvailableDays';
import ListAvailableHours from '../services/Schedules/ListAvailableHours';
import FormatSchedule from '../services/Schedules/FormatSchedule';

import CreateRestTimeService from '../services/RestTimes/CreateRestTimeService';
import CreateHolidayService from '../services/Holidays/CreateHolidayService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

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

schedulesRouter.put('/', async (request, response) => {
  const { scheduleId, openTime, closeTime } = request.body;

  const updateSchedule = new UpdateScheduleService();

  const scheduleAvailability = await updateSchedule.execute({
    scheduleId,
    openTime,
    closeTime,
  });

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
  const { day } = request.body;
  const specialistId = request.user.id;

  const createHoliday = new CreateHolidayService();

  const holiday = await createHoliday.execute({
    specialistId,
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

  const unparsedSchedule = await schedulesRepository.find({
    where: { specialistId: id },
  });

  const formatSchedule = new FormatSchedule();

  const schedule = formatSchedule.execute(unparsedSchedule);

  return response.json(schedule);
});

schedulesRouter.get('/availableDays/:id', async (request, response) => {
  const { id } = request.params;

  const listAvailableDays = new ListAvailableDays();

  const availableDays = await listAvailableDays.execute(id);

  return response.json(availableDays);
});

schedulesRouter.get(
  '/availableHours/:id&:day&:date',
  async (request, response) => {
    const { id, day, date } = request.params;

    console.log(id, day, date);

    // const listAvailableHours = new ListAvailableHours();

    // const availableHours = listAvailableHours.execute({
    //   specialistId: id,
    //   day,
    //   date,
    // });

    // return response.json(availableHours);

    return response.json({ ok: 'a' });
  },
);

schedulesRouter.get('/holiday/:id', async (request, response) => {
  const { id } = request.params;

  const holidaysRepository = getRepository(Holiday);

  const holidays = await holidaysRepository.find({
    where: { specialistId: id },
  });

  return response.json(holidays);
});

export default schedulesRouter;
