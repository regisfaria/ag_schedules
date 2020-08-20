import { getRepository } from 'typeorm';

import ScheduleAvailability from '../../models/ScheduleAvailability';

import ConvertStringHourToInt from '../../utils/ConvertStringHourToInt';

import AppError from '../../errors/AppError';

interface Request {
  scheduleId: string;
  openTime: string;
  closeTime: string;
}

export default class UpdateScheduleService {
  public async execute({
    scheduleId,
    openTime,
    closeTime,
  }: Request): Promise<ScheduleAvailability> {
    const schedulesRepository = getRepository(ScheduleAvailability);

    const schedule = await schedulesRepository.findOne(scheduleId);
    if (!schedule) {
      throw new AppError('Esse especialista nao tem agenda');
    }

    const parsedOpenTime = ConvertStringHourToInt(openTime);
    const parsedCloseTime = ConvertStringHourToInt(closeTime);

    schedule.openTime = parsedOpenTime;
    schedule.closeTime = parsedCloseTime;

    return schedulesRepository.save(schedule);
  }
}
