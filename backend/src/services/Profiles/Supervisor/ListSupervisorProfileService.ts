import { getRepository } from 'typeorm';

import SupervisorProfile from '../../../models/SupervisorProfile';

import AppError from '../../../errors/AppError';

export default class ListSupervisorProfileService {
  public async execute(userId: string): Promise<SupervisorProfile> {
    const supervisorProfilesRepository = getRepository(SupervisorProfile);

    const supervisorProfile = await supervisorProfilesRepository.findOne({
      where: { userId },
    });

    if (!supervisorProfile) {
      throw new AppError('Nao existe nenhum perfil para este usuario');
    }

    supervisorProfile.imageUrl = `http://localhost:3333/files/${supervisorProfile.image}`;

    delete supervisorProfile.image;

    return supervisorProfile;
  }
}
