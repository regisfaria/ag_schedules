import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import RestTime from '../../models/RestTime';

class DeleteRestTime {
  public async execute(id: string): Promise<void> {
    const restTimeRepository = getRepository(RestTime);

    const restTime = await restTimeRepository.findOne(id);

    if (!restTime) {
      throw new AppError('Horario não encontrado');
    }

    await restTimeRepository.remove(restTime);
  }
}

export default DeleteRestTime;
