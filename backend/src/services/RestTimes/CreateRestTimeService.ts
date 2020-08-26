import { getRepository } from 'typeorm';

import RestTime from '../../models/RestTime';
import ScheduleAvailability from '../../models/ScheduleAvailability';
import AppError from '../../errors/AppError';

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

    const restStartAvailability = await restTimesRepository.find({
      where: { startTime: parsedStartTime },
    });

    const restEndAvailability = await restTimesRepository.find({
      where: { endTime: parsedEndTime },
    });

    if (restStartAvailability || restEndAvailability) {
      throw new AppError(
        'Você não pode marcar um intervalo em horarios já marcados ',
      );
    }

    if (!scheduleAvailability?.openTime || !scheduleAvailability?.closeTime) {
      throw new AppError('Horarios invalidos');
    }

    if (
      parsedStartTime < scheduleAvailability.openTime ||
      parsedEndTime > scheduleAvailability?.closeTime
    ) {
      throw new AppError(
        'Você não pode marcar um intervalo fora do horario de trabalho',
      );
    }

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
