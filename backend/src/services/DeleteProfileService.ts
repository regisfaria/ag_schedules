import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Profile from '../models/Profile';

class DeleteProfileService {
  public async execute(userId: string): Promise<void> {
    const profilesRepository = getRepository(Profile);

    const profile = await profilesRepository.findOne({ where: { userId } });

    if (!profile) {
      throw new AppError('Nenhum perfil foi encontrado com esse ID.');
    }

    await profilesRepository.remove(profile);
  }
}

export default DeleteProfileService;
