/* eslint-disable no-param-reassign */
import RestTime from '../../models/RestTime';

class FormatRestTimes {
  public execute(restTimes: RestTime[]): RestTime[] {
    restTimes.forEach(restTime => {
      if (!restTime) {
        return;
      }

      const startTimeMod = restTime.startTime % 60;

      if (startTimeMod === 0) {
        const parsedHour = restTime.startTime / 60;

        restTime.formatedStartHour = parsedHour;
        restTime.formatedStartMinute = 0;
        delete restTime.startTime;
      } else {
        const parsedHour = Math.floor(restTime.startTime / 60);

        restTime.formatedStartHour = parsedHour;
        restTime.formatedStartMinute = startTimeMod;
        delete restTime.startTime;
      }

      const closeTimeMod = restTime.endTime % 60;

      if (closeTimeMod === 0) {
        const parsedHour = restTime.endTime / 60;

        restTime.formatedEndHour = parsedHour;
        restTime.formatedEndMinute = 0;
        delete restTime.endTime;
      } else {
        const parsedHour = Math.floor(restTime.endTime / 60);

        restTime.formatedEndHour = parsedHour;
        restTime.formatedEndMinute = closeTimeMod;
        delete restTime.endTime;
      }
    });

    // eslint-disable-next-line consistent-return
    return restTimes;
  }
}

export default FormatRestTimes;
