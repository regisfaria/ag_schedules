import { getRepository } from 'typeorm';

import Holiday from '../../models/Holiday';
import User from '../../models/User';
import AppError from '../../errors/AppError';

interface Request {
  specialistId: string;
  day: Date;
}

class CreateHolidayService {
  public async execute({ specialistId, day }: Request): Promise<Holiday> {
    const holidaysRepository = getRepository(Holiday);
    const usersRepository = getRepository(User);

    const specialist = await usersRepository.findOne({
      where: { id: specialistId },
    });

    if (specialist?.type !== 'specialist') {
      throw new AppError(
        'Apenas especialistas podem criar excessoes na agenda.',
        401,
      );
    }

    const holidayAlreadyExists = await holidaysRepository.findOne({
      where: { day },
    });

    if (holidayAlreadyExists) {
      throw new AppError('Voce ja tem uma excessao cadastrada para este dia');
    }

    const holiday = holidaysRepository.create({
      specialist,
      specialistId,
      day,
    });

    await holidaysRepository.save(holiday);

    return holiday;
  }
}

export default CreateHolidayService;
