import { getRepository } from 'typeorm';

import Profile from '../../models/Profile';
import User from '../../models/User';

import AppError from '../../errors/AppError';

export default class CreateProfileService {
  public async execute(userId: string): Promise<Profile> {
    const profilesRepository = getRepository(Profile);
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userId);
    const profileAlreadyExist = await profilesRepository.findOne({
      where: { userId },
    });

    if (profileAlreadyExist) {
      throw new AppError('Este usuario ja tem um perfil');
    }

    if (!user) {
      throw new AppError('Nenhum usuario com este ID foi encontrado.');
    }

    const profile = profilesRepository.create({
      user,
      userId,
      image: 'standard-profile-picture.png',
    });

    await profilesRepository.save(profile);

    return profile;
  }
}
