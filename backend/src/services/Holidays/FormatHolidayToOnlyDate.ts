/* eslint-disable no-param-reassign */
import Holiday from '../../models/Holiday';

class ListAllUserHolidayService {
  public execute(holidays: Holiday[]): Holiday[] {
    holidays.forEach(holiday => {
      delete holiday.id;
      delete holiday.specialistId;
      delete holiday.createdAt;
      delete holiday.updatedAt;
      delete holiday.deletedAt;
    });

    return holidays;
  }
}

export default ListAllUserHolidayService;
