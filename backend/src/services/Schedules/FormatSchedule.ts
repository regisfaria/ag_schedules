/* eslint-disable no-param-reassign */
import ScheduleAvailability from '../../models/ScheduleAvailability';

class FormatSchedule {
  public execute(schedules: ScheduleAvailability[]): ScheduleAvailability[] {
    schedules.forEach(schedule => {
      switch (schedule.day) {
        case 0:
          schedule.formatedDay = 'Dom';
          break;
        case 1:
          schedule.formatedDay = 'Seg';
          break;
        case 2:
          schedule.formatedDay = 'Ter';
          break;

        case 3:
          schedule.formatedDay = 'Qua';
          break;
        case 4:
          schedule.formatedDay = 'Qui';
          break;
        case 5:
          schedule.formatedDay = 'Sex';
          break;
        case 6:
          schedule.formatedDay = 'Sab';
          break;

        default:
          break;
      }

      if (schedule.openTime === -1 || schedule.closeTime === -1) {
        schedule.workDay = false;
        schedule.formatedOpenHour = -1;
        schedule.formatedOpenMinute = -1;
        delete schedule.openTime;
        schedule.formatedCloseHour = -1;
        schedule.formatedCloseMinute = -1;
        delete schedule.closeTime;

        return;
      }

      const openTimeMod = schedule.openTime % 60;

      if (openTimeMod === 0) {
        const parsedHour = schedule.openTime / 60;

        schedule.formatedOpenHour = parsedHour;
        schedule.formatedOpenMinute = 0;
        delete schedule.openTime;
      } else {
        const parsedHour = Math.floor(schedule.openTime / 60);

        schedule.formatedOpenHour = parsedHour;
        schedule.formatedOpenMinute = openTimeMod;
        delete schedule.openTime;
      }

      const closeTimeMod = schedule.closeTime % 60;

      if (closeTimeMod === 0) {
        const parsedHour = schedule.closeTime / 60;

        schedule.formatedCloseHour = parsedHour;
        schedule.formatedCloseMinute = 0;
        delete schedule.closeTime;
      } else {
        const parsedHour = Math.floor(schedule.closeTime / 60);

        schedule.formatedCloseHour = parsedHour;
        schedule.formatedCloseMinute = closeTimeMod;
        delete schedule.closeTime;
      }

      schedule.workDay = true;
    });

    return schedules;
  }
}

export default FormatSchedule;
