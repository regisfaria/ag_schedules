import { getRepository } from 'typeorm';

import User from '../../models/User';
import ScheduleAvailability from '../../models/ScheduleAvailability';
import Consult from '../../models/Consult';
import RestTime from '../../models/RestTime';

import AppError from '../../errors/AppError';

import ConvertIntHourToString from '../../utils/ConvertIntHourToString';

interface Request {
  specialistId: string;
  day: string;
  date: string;
}

class ListAvailableHours {
  public async execute({
    specialistId,
    day,
    date,
  }: Request): Promise<string[]> {
    const usersRepository = getRepository(User);
    const schedulesAvailabilityRepository = getRepository(ScheduleAvailability);
    const consultsRepository = getRepository(Consult);
    const restTimesRepository = getRepository(RestTime);

    const specialist = await usersRepository.findOne(specialistId);

    if (!specialist) {
      throw new AppError('Este especialista nao existe');
    }

    const schedule = await schedulesAvailabilityRepository.findOne({
      where: { specialistId, day },
    });

    if (!schedule) {
      throw new AppError(
        'Este especialista nao tem agenda disponivel no dia fornecido',
      );
    }

    const workArrayLength =
      schedule.closeTime < 60
        ? 1
        : Math.floor((schedule.closeTime - schedule.openTime) / 60);

    const unparsedTimeArray = Array.from(
      { length: workArrayLength },
      (_, index) => index * 60 + schedule.openTime,
    );

    const restTimes = await restTimesRepository.find({
      where: { scheduleAvailabilityId: schedule.id },
    });

    if (restTimes) {
      restTimes.forEach(restTime => {
        const restTimeArrayLength =
          restTime.endTime < 60
            ? 1
            : Math.floor((restTime.endTime - restTime.startTime) / 60);

        // eslint-disable-next-line array-callback-return
        Array.from({ length: restTimeArrayLength }, (_, index) => {
          const restHour = index * 60 + restTime.startTime;
          const hourToDelete = unparsedTimeArray.findIndex(
            hour => hour === restHour,
          );

          unparsedTimeArray.splice(hourToDelete, 1);
        });
      });
    }

    const consults = await consultsRepository.find({
      where: { specialistId, date },
    });

    if (consults) {
      consults.forEach(consult => {
        const consultAlreadyScheaduled = unparsedTimeArray.findIndex(
          hours => hours === consult.hour,
        );

        unparsedTimeArray.splice(consultAlreadyScheaduled, 1);
      });
    }

    const availableWorkHours = unparsedTimeArray.map(unparsedTime =>
      ConvertIntHourToString(unparsedTime),
    );

    return availableWorkHours;
  }
}

export default ListAvailableHours;
