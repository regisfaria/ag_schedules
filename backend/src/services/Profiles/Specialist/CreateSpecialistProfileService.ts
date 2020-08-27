import { getRepository } from 'typeorm';

import SpecialistProfile from '../../../models/SpecialistProfile';
import User from '../../../models/User';

import AppError from '../../../errors/AppError';

export default class CreateSpecialistProfileService {
  public async execute(userId: string): Promise<SpecialistProfile> {
    const specialistProfilesRepository = getRepository(SpecialistProfile);
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userId);
    const profileAlreadyExist = await specialistProfilesRepository.findOne({
      where: { userId },
    });

    if (profileAlreadyExist) {
      throw new AppError('Este usuario ja tem um perfil');
    }

    if (!user) {
      throw new AppError('Nenhum usuario com este ID foi encontrado.');
    }

    if (user.type !== 'specialist') {
      throw new AppError('O usuario precisa ser um especialista.');
    }

    const specialistProfile = specialistProfilesRepository.create({
      user,
      userId,
      image: 'standard-profile-picture.png',
    });

    await specialistProfilesRepository.save(specialistProfile);

    return specialistProfile;
  }
}
