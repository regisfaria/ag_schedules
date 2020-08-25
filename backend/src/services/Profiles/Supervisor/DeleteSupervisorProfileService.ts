import { getRepository } from 'typeorm';
import AppError from '../../../errors/AppError';

import SupervisorProfile from '../../../models/SupervisorProfile';

export default class DeleteSupervisorProfileService {
  public async execute(userId: string): Promise<void> {
    const supervisorProfilesRepository = getRepository(SupervisorProfile);

    const supervisorProfile = await supervisorProfilesRepository.findOne({
      where: { id: userId },
    });

    if (!supervisorProfile) {
      throw new AppError('Nenhum perfil foi encontrado com esse ID.');
    }

    await supervisorProfilesRepository.remove(supervisorProfile);
  }
}
