import { getRepository } from 'typeorm';

import SupervisorProfile from '../../../models/SupervisorProfile';
import User from '../../../models/User';

import AppError from '../../../errors/AppError';

export default class CreateSupervisorProfileService {
  public async execute(userId: string): Promise<SupervisorProfile> {
    const supervisorProfilesRepository = getRepository(SupervisorProfile);
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new AppError('Nenhum usuario com este ID foi encontrado.');
    }

    if (user.type !== 'supervisor') {
      throw new AppError('O usuario precisa ser um supervisor.');
    }

    const supervisorProfile = supervisorProfilesRepository.create({
      user,
      userId,
    });

    await supervisorProfilesRepository.save(supervisorProfile);

    return supervisorProfile;
  }
}
