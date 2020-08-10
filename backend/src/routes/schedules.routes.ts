import { Router } from 'express';

import CreateScheduleAvailabilityService from '../services/CreateScheduleAvailabilityService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const schedulesRouter = Router();

schedulesRouter.use(ensureAuthenticated);

schedulesRouter.post('/', async (request, response) => {
  const { specialistId } = request.body;

  const createScheduleAvailability = new CreateScheduleAvailabilityService();

  // const days = [0, 1, 2, 3, 4, 5, 6];
  // const openTime = -1;
  // const closeTime = -1;

  const scheduleAvailability = await createScheduleAvailability.execute(
    specialistId,
  );

  return response.json(scheduleAvailability);
});

export default schedulesRouter;
