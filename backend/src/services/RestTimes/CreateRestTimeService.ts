import { getRepository } from 'typeorm';

import RestTime from '../../models/RestTime';
import ScheduleAvailability from '../../models/ScheduleAvailability';

import ConvertStringHourToInt from '../../utils/ConvertStringHourToInt';

interface Request {
  scheduleAvailabilityId: string;
  startTime: string;
  endTime: string;
}

class CreateRestTimeService {
  public async execute({
    scheduleAvailabilityId,
    startTime,
    endTime,
  }: Request): Promise<RestTime> {
    const restTimesRepository = getRepository(RestTime);
    const schedulesRepository = getRepository(ScheduleAvailability);

    const parsedStartTime = ConvertStringHourToInt(startTime);
    const parsedEndTime = ConvertStringHourToInt(endTime);

    const scheduleAvailability = await schedulesRepository.findOne(
      scheduleAvailabilityId,
    );

    const restTime = restTimesRepository.create({
      scheduleAvailability,
      scheduleAvailabilityId,
      startTime: parsedStartTime,
      endTime: parsedEndTime,
    });

    await restTimesRepository.save(restTime);

    return restTime;
  }
}

export default CreateRestTimeService;
