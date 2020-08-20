import { getRepository } from 'typeorm';
import { getDay } from 'date-fns';

import User from '../../models/User';
import ScheduleAvailability from '../../models/ScheduleAvailability';
import Consult from '../../models/Consult';
import RestTime from '../../models/RestTime';

import AppError from '../../errors/AppError';

interface Request {
  specialistId: string;
  day: number;
  date: Date;
}

class ListAvailableHours {
  public async execute({ specialistId, day, date }: Request): Promise<void> {
    const usersRepository = getRepository(User);
    const schedulesAvailabilityRepository = getRepository(ScheduleAvailability);
    const consultsRepository = getRepository(Consult);
    const restTimesRepository = getRepository(RestTime);

    const specialist = await usersRepository.findOne(specialistId);

    if (!specialist) {
      throw new AppError('este usuario nao existe');
    }

    const day = getDay(date);
  }
}

export default ListAvailableHours;
