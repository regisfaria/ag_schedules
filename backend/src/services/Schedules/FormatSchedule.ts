/* eslint-disable no-param-reassign */
import ScheduleAvailability from '../../models/ScheduleAvailability';

class FormatSchedule {
  public execute(schedules: ScheduleAvailability[]): ScheduleAvailability[] {
    schedules.forEach(schedule => {
      switch (schedule.day) {
        case 0:
          schedule.mobileFormatedDay = 'D';
          schedule.desktopFormatedDay = 'Dom';
          break;
        case 1:
          schedule.mobileFormatedDay = '2ª';
          schedule.desktopFormatedDay = 'Seg';
          break;
        case 2:
          schedule.mobileFormatedDay = '3ª';
          schedule.desktopFormatedDay = 'Ter';
          break;

        case 3:
          schedule.mobileFormatedDay = '4ª';
          schedule.desktopFormatedDay = 'Qua';
          break;
        case 4:
          schedule.mobileFormatedDay = '5ª';
          schedule.desktopFormatedDay = 'Qui';
          break;
        case 5:
          schedule.mobileFormatedDay = '6ª';
          schedule.desktopFormatedDay = 'Sex';
          break;
        case 6:
          schedule.mobileFormatedDay = 'S';
          schedule.desktopFormatedDay = 'Sab';
          break;

        default:
          break;
      }

      if (schedule.openTime === -1 || schedule.closeTime === -1) {
        schedule.workDay = false;
        schedule.formatedOpenTime = 'none';
        delete schedule.openTime;
        schedule.formatedCloseTime = 'none';
        delete schedule.closeTime;

        return;
      }

      const openTimeMod = schedule.openTime % 60;
      if (openTimeMod === 0) {
        const parsedHour = schedule.openTime / 60;
        const formatedHour = `${parsedHour}:00`;

        schedule.formatedOpenTime = formatedHour;
        delete schedule.openTime;
      } else {
        const parsedHour = Math.floor(schedule.openTime / 60);
        const formatedHour = `${parsedHour}:${openTimeMod}`;

        schedule.formatedOpenTime = formatedHour;
        delete schedule.openTime;
      }

      const closeTimeMod = schedule.closeTime % 60;
      if (closeTimeMod === 0) {
        const parsedHour = schedule.closeTime / 60;
        const formatedHour = `${parsedHour}:00`;

        schedule.formatedCloseTime = formatedHour;
        delete schedule.closeTime;
      } else {
        const parsedHour = Math.floor(schedule.closeTime / 60);
        const formatedHour = `${parsedHour}:${closeTimeMod}`;

        schedule.formatedCloseTime = formatedHour;
        delete schedule.closeTime;
      }

      schedule.workDay = true;
    });

    return schedules;
  }
}

export default FormatSchedule;
