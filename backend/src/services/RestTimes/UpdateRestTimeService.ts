import { getRepository } from 'typeorm';

import RestTime from '../../models/RestTime';

import ConvertStringHourToInt from '../../utils/ConvertStringHourToInt';

import AppError from '../../errors/AppError';

interface Request {
  restTimeId: string;
  openTime: string;
  closeTime: string;
}

export default class UpdateRestTime {
  public async execute({
    restTimeId,
    openTime,
    closeTime,
  }: Request): Promise<RestTime> {
    const restTimeRepository = getRepository(RestTime);

    const rest = await restTimeRepository.findOne(restTimeId);

    if (!rest) {
      throw new AppError('Horario não encontrado');
    }

    const parsedOpenTime = ConvertStringHourToInt(openTime);
    const parsedCloseTime = ConvertStringHourToInt(closeTime);

    rest.startTime = parsedOpenTime;
    rest.endTime = parsedCloseTime;

    return restTimeRepository.save(rest);
  }
}
