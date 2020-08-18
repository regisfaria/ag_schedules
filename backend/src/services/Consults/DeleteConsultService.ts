import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import Consult from '../../models/Consult';

class DeleteConsultService {
  public async execute(id: string): Promise<void> {
    const consultsRepository = getRepository(Consult);

    const consult = await consultsRepository.findOne(id);

    if (!consult) {
      throw new AppError('Nenhuma consulta foi encontrada com esse ID.');
    }

    await consultsRepository.remove(consult);
  }
}

export default DeleteConsultService;
