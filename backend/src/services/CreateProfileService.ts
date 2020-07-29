import { getRepository } from 'typeorm';

import Profile from '../models/Profile';
import User from '../models/User';

export default class CreateProfileService {
  public async execute(user: User): Promise<Profile> {
    const profileRepository = getRepository(Profile);

    const profile = profileRepository.create({
      user,
      userId: user.id,
    });

    await profileRepository.save(profile);

    return profile;
  }
}
