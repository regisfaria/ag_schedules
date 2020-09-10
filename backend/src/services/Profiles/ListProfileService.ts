import { getRepository } from 'typeorm';

import Profile from '../../models/Profile';
import User from '../../models/User';

import AppError from '../../errors/AppError';

export default class ListProfileService {
  public async execute(userId: string): Promise<Profile> {
    const profilesRepository = getRepository(Profile);
    const usersRepository = getRepository(User);

    const profile = await profilesRepository.findOne({
      where: { userId },
    });
    const user = await usersRepository.findOne(userId);

    if (!profile) {
      throw new AppError('Nao existe nenhum perfil para este usuario');
    }

    if (!user) {
      throw new AppError('Nao existe um usuario com este ID');
    }

    profile.imageUrl = `http://localhost:3333/files/${profile.image}`;
    profile.name = user.name;
    profile.email = user.email;

    delete profile.image;

    return profile;
  }
}
