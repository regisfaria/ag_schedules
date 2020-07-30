import { getRepository } from 'typeorm';

import Profile from '../models/Profile';
import User from '../models/User';

export default class CreateProfileService {
  public async execute(user: User): Promise<Profile> {
    const profilesRepository = getRepository(Profile);

    const profile = profilesRepository.create({
      user,
      userId: user.id,
    });

    await profilesRepository.save(profile);

    return profile;
  }
}
