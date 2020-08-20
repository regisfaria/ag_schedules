import { getRepository } from 'typeorm';

import User from '../../models/User';
import ScheduleAvailability from '../../models/ScheduleAvailability';

import AppError from '../../errors/AppError';

class ListAvailableDays {
  public async execute(specialistId: string): Promise<number[]> {
    const usersRepository = getRepository(User);
    const schedulesAvailabilityRepository = getRepository(ScheduleAvailability);

    const specialist = await usersRepository.findOne(specialistId);

    if (!specialist) {
      throw new AppError('este usuario nao existe');
    }

    const weekSchedule = await schedulesAvailabilityRepository.find({
      where: { specialistId },
    });

    const availableDays: number[] = [];
    weekSchedule.forEach(schedule => {
      if (schedule.openTime !== -1 && schedule.closeTime !== -1) {
        availableDays.push(schedule.day);
      }
    });

    return availableDays;
  }
}

export default ListAvailableDays;
