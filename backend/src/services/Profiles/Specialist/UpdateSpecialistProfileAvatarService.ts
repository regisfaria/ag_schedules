import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../../../config/upload';

import SpecialistProfile from '../../../models/SpecialistProfile';

import AppError from '../../../errors/AppError';

interface Request {
  userId: string;
  imageFileName: string;
}

export default class UpdateSpecialistProfileAvatarService {
  public async execute({
    userId,
    imageFileName,
  }: Request): Promise<SpecialistProfile> {
    const specialistProfilesRepository = getRepository(SpecialistProfile);

    const specialistProfile = await specialistProfilesRepository.findOne({
      where: {
        userId,
      },
    });

    if (!specialistProfile) {
      throw new AppError(
        'Apenas usuarios logados podem alterar a imagem de perfil.',
        401,
      );
    }

    if (specialistProfile.image) {
      const profileImageFilePath = path.join(
        uploadConfig.directory,
        specialistProfile.image,
      );
      const userImageFileExists = await fs.promises.stat(profileImageFilePath);

      if (userImageFileExists) {
        await fs.promises.unlink(profileImageFilePath);
      }
    }

    specialistProfile.image = imageFileName;

    await specialistProfilesRepository.save(specialistProfile);

    return specialistProfile;
  }
}
