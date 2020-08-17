import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../../../config/upload';

import SupervisorProfile from '../../../models/SupervisorProfile';

import AppError from '../../../errors/AppError';

interface Request {
  userId: string;
  imageFileName: string;
}

export default class UpdateSupervisorProfileAvatarService {
  public async execute({
    userId,
    imageFileName,
  }: Request): Promise<SupervisorProfile> {
    const supervisorProfilesRepository = getRepository(SupervisorProfile);

    const supervisorProfile = await supervisorProfilesRepository.findOne({
      where: {
        userId,
      },
    });

    if (!supervisorProfile) {
      throw new AppError(
        'Apenas usuarios logados podem alterar a imagem de perfil.',
        401,
      );
    }

    if (supervisorProfile.image) {
      const profileImageFilePath = path.join(
        uploadConfig.directory,
        supervisorProfile.image,
      );
      const userImageFileExists = await fs.promises.stat(profileImageFilePath);

      if (userImageFileExists) {
        await fs.promises.unlink(profileImageFilePath);
      }
    }

    supervisorProfile.image = imageFileName;

    await supervisorProfilesRepository.save(supervisorProfile);

    return supervisorProfile;
  }
}
