import { getRepository } from 'typeorm';

import SupervisorProfile from '../../../models/SupervisorProfile';
import User from '../../../models/User';

import AppError from '../../../errors/AppError';

export default class CreateSupervisorProfileService {
  public async execute(userId: string): Promise<SupervisorProfile> {
    const supervisorProfilesRepository = getRepository(SupervisorProfile);
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userId);
    const profileAlreadyExist = await supervisorProfilesRepository.findOne({
      where: { userId },
    });

    if (profileAlreadyExist) {
      throw new AppError('Este usuario ja tem um perfil');
    }

    if (!user) {
      throw new AppError('Nenhum usuario com este ID foi encontrado.');
    }

    if (user.type !== 'supervisor') {
      throw new AppError('O usuario precisa ser um supervisor.');
    }

    const supervisorProfile = supervisorProfilesRepository.create({
      user,
      userId,
      image: 'standard-profile-picture.png',
    });

    await supervisorProfilesRepository.save(supervisorProfile);

    return supervisorProfile;
  }
}
