/* eslint-disable no-param-reassign */
import RestTime from '../../models/RestTime';

class FormatRestTimes {
  public execute(restTime: RestTime | undefined): RestTime | void {
    if (!restTime) {
      return;
    }

    const startTimeMod = restTime.startTime % 60;
    if (startTimeMod === 0) {
      const parsedHour = restTime.startTime / 60;
      const formatedHour = `${parsedHour}:00`;

      restTime.formatedStartTime = formatedHour;
      delete restTime.startTime;
    } else {
      const parsedHour = Math.floor(restTime.startTime / 60);
      const formatedHour = `${parsedHour}:${startTimeMod}`;

      restTime.formatedStartTime = formatedHour;
      delete restTime.startTime;
    }

    const closeTimeMod = restTime.endTime % 60;
    if (closeTimeMod === 0) {
      const parsedHour = restTime.endTime / 60;
      const formatedHour = `${parsedHour}:00`;

      restTime.formatedEndTime = formatedHour;
      delete restTime.endTime;
    } else {
      const parsedHour = Math.floor(restTime.endTime / 60);
      const formatedHour = `${parsedHour}:${closeTimeMod}`;

      restTime.formatedEndTime = formatedHour;
      delete restTime.endTime;
    }

    // eslint-disable-next-line consistent-return
    return restTime;
  }
}

export default FormatRestTimes;
