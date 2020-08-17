import { getRepository } from 'typeorm';
import AppError from '../../../errors/AppError';

import SpecialistProfile from '../../../models/SpecialistProfile';

export default class DeleteSpecialistProfileService {
  public async execute(userId: string): Promise<void> {
    const specialistProfilesRepository = getRepository(SpecialistProfile);

    const specialistProfile = await specialistProfilesRepository.findOne({
      where: { userId },
    });

    if (!specialistProfile) {
      throw new AppError('Nenhum perfil foi encontrado com esse ID.');
    }

    await specialistProfilesRepository.remove(specialistProfile);
  }
}
