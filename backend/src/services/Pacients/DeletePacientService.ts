import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import Pacient from '../../models/Pacient';

class DeletePacientService {
  public async execute(id: string): Promise<void> {
    const pacientsRepository = getRepository(Pacient);

    const pacient = await pacientsRepository.findOne(id);

    if (!pacient) {
      throw new AppError('Nenhum paciente foi encontrado com esse ID.');
    }

    await pacientsRepository.remove(pacient);
  }
}

export default DeletePacientService;
