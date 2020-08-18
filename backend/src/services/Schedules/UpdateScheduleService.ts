import { getRepository } from 'typeorm';

import ScheduleAvailability from '../../models/ScheduleAvailability';

import ConvertStringHourToInt from '../../utils/ConvertStringHourToInt';

import AppError from '../../errors/AppError';

interface Request {
  userId: string;
  day: number;
  openTime: string;
  closeTime: string;
}

export default class UpdateUserAvatarServie {
  public async execute({
    userId,
    day,
    openTime,
    closeTime,
  }: Request): Promise<ScheduleAvailability> {
    const schedulesRepository = getRepository(ScheduleAvailability);

    const schedule = await schedulesRepository.findOne({
      where: { userId },
    });

    if (!schedule) {
      throw new AppError('Esse especialista nao tem agenda');
    }

    const parsedOpenTime = ConvertStringHourToInt(openTime);
    const parsedCloseTime = ConvertStringHourToInt(closeTime);

    schedule.day = day;
    schedule.openTime = parsedOpenTime;
    schedule.closeTime = parsedCloseTime;

    return schedulesRepository.save(schedule);
  }
}
