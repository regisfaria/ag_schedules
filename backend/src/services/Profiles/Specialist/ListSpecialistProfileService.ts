import { getRepository } from 'typeorm';

import SpecialistProfile from '../../../models/SpecialistProfile';

import AppError from '../../../errors/AppError';

export default class ListSpecialistProfileService {
  public async execute(userId: string): Promise<SpecialistProfile> {
    const specialistProfilesRepository = getRepository(SpecialistProfile);

    const specialistProfile = await specialistProfilesRepository.findOne({
      where: { userId },
    });

    if (!specialistProfile) {
      throw new AppError('Nao existe nenhum perfil para este usuario');
    }

    specialistProfile.imageUrl = `http://localhost:3333/files/${specialistProfile.image}`;

    delete specialistProfile.image;

    return specialistProfile;
  }
}
