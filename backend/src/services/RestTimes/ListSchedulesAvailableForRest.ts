import { getRepository } from 'typeorm';

import RestTime from '../../models/RestTime';
import FormatRestTimes from './FormatRestTimesService';

interface Request {
  id: string;
  openTime: number;
  closeTime: number;
}

class ListSchedulesAvailableForRest {
  public async execute({
    id,
    openTime,
    closeTime,
  }: Request): Promise<number[]> {
    let formatedOpenHour = 0;
    let formatedCloseHour = 0;
    const restTimesRepository = getRepository(RestTime);

    const unparsedRestTimes = await restTimesRepository.find({
      where: { scheduleAvailabilityId: id },
    });

    const formatRestTimes = new FormatRestTimes();

    const restTimes = formatRestTimes.execute(unparsedRestTimes);

    const startTimeMod = openTime % 60;

    if (startTimeMod === 0) {
      formatedOpenHour = openTime / 60;
    } else {
      formatedOpenHour = Math.floor(openTime / 60);
    }

    const closeTimeMod = closeTime % 60;

    if (closeTimeMod === 0) {
      formatedCloseHour = closeTime / 60;
    } else {
      formatedCloseHour = Math.floor(closeTime / 60);
    }

    const createArrayForStartHours = Array.from(
      { length: formatedCloseHour - formatedOpenHour - 1 },
      (_, index) => index + formatedOpenHour + 1,
    );

    restTimes.forEach(element => {
      const inicialValueRest = createArrayForStartHours.findIndex(
        number => number === element.formatedStartHour,
      );

      const endValueRest = createArrayForStartHours.findIndex(
        number => number === element.formatedEndHour,
      );

      createArrayForStartHours.splice(
        inicialValueRest,
        endValueRest - inicialValueRest,
      );
    });

    createArrayForStartHours.pop();

    return createArrayForStartHours;
  }
}

export default ListSchedulesAvailableForRest;
