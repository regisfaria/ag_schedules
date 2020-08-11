import { getRepository } from 'typeorm';

import User from '../models/User';
import ScheduleAvailability from '../models/ScheduleAvailability';

class CreateScheduleAvailabilityService {
  public async execute(specialistId: string): Promise<ScheduleAvailability[]> {
    const schedulesRepository = getRepository(ScheduleAvailability);
    const usersRepository = getRepository(User);

    const specialist = await usersRepository.findOne(specialistId);

    const days = [0, 1, 2, 3, 4, 5, 6];

    const specialistSchedule: ScheduleAvailability[] = [];
    await days.forEach(day => {
      const scheduleAvailability = schedulesRepository.create({
        specialist,
        specialistId,
        day,
        openTime: -1,
        closeTime: -1,
      });

      schedulesRepository.save(scheduleAvailability);

      specialistSchedule.push(scheduleAvailability);
    });

    return specialistSchedule;
  }
}

export default CreateScheduleAvailabilityService;
