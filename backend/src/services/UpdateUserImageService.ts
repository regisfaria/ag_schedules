import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';

import Profile from '../models/Profile';

import AppError from '../errors/AppError';

interface Request {
  userId: string;
  imageFileName: string;
}

export default class UpdateUserAvatarServie {
  public async execute({ userId, imageFileName }: Request): Promise<Profile> {
    const profilesRepository = getRepository(Profile);

    const profile = await profilesRepository.findOne({
      where: {
        userId,
      },
    });

    if (!profile) {
      throw new AppError(
        'Apenas usuarios logados podem alterar a imagem de perfil.',
        401,
      );
    }

    if (profile.image) {
      const profileImageFilePath = path.join(
        uploadConfig.directory,
        profile.image,
      );
      const userImageFileExists = await fs.promises.stat(profileImageFilePath);

      if (userImageFileExists) {
        await fs.promises.unlink(profileImageFilePath);
      }
    }

    profile.image = imageFileName;

    await profilesRepository.save(profile);

    return profile;
  }
}
