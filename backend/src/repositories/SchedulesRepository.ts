import { EntityRepository, Repository } from 'typeorm';

import ScheduleAvailability from '../models/ScheduleAvailability';

@EntityRepository(ScheduleAvailability)
export default class AppointmentsRepository extends Repository<
  ScheduleAvailability
> {
  public async findByDate(date: Date): Promise<ScheduleAvailability | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}
