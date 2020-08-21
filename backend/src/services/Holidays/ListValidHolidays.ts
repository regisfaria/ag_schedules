/* eslint-disable no-param-reassign */
import { isBefore } from 'date-fns';
import Holiday from '../../models/Holiday';

class ListValidHolidays {
  public execute(holidays: Holiday[]): string[] {
    const validHolidays: string[] = [];

    holidays.forEach(holiday => {
      if (isBefore(new Date(holiday.day), new Date())) {
        return;
      }

      const date = String(holiday.day).split('T');

      validHolidays.push(date[0]);
    });

    return validHolidays;
  }
}

export default ListValidHolidays;
