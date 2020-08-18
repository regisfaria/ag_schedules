/* eslint-disable no-param-reassign */
import Consult from '../../models/Consult';

class ConvertHourToStringService {
  public execute(consults: Consult[]): Consult[] {
    consults.forEach(consult => {
      const hourMod = consult.hour % 60;
      if (hourMod === 0) {
        const parsedHour = consult.hour / 60;
        const formatedHour = `${parsedHour}:00`;

        consult.formatedHour = formatedHour;
        delete consult.hour;
      } else {
        const parsedHour = Math.floor(consult.hour / 60);
        const formatedHour = `${parsedHour}:${hourMod}`;

        consult.formatedHour = formatedHour;
        delete consult.hour;
      }
    });

    return consults;
  }
}

export default ConvertHourToStringService;
