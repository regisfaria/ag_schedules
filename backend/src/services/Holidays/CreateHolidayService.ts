import { getRepository } from 'typeorm';

import Holiday from '../../models/Holiday';
import ScheduleAvailability from '../../models/ScheduleAvailability';

interface Request {
  scheduleAvailabilityId: string;
  day: Date;
}

class CreateHolidayService {
  public async execute({
    scheduleAvailabilityId,
    day,
  }: Request): Promise<Holiday> {
    const holidaysRepository = getRepository(Holiday);
    const schedulesRepository = getRepository(ScheduleAvailability);

    const scheduleAvailability = await schedulesRepository.findOne(
      scheduleAvailabilityId,
    );

    const holiday = holidaysRepository.create({
      scheduleAvailability,
      scheduleAvailabilityId,
      day,
    });

    await holidaysRepository.save(holiday);

    return holiday;
  }
}

export default CreateHolidayService;
