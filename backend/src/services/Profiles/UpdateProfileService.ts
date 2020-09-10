import { getRepository } from 'typeorm';

import Profile from '../../models/Profile';

import AppError from '../../errors/AppError';

interface Request {
  userId: string;
  phoneNumber: string;
  city: string;
  state: string;
  street: string;
  addressNumber: string;
  addressComplement: string;
  cep: string;
  description: string;
}

export default class UpdateProfileService {
  public async execute({
    userId,
    description,
    phoneNumber,
    city,
    state,
    street,
    cep,
    addressNumber,
    addressComplement,
  }: Request): Promise<Profile> {
    const profileRepository = getRepository(Profile);

    const profile = await profileRepository.findOne({
      where: { userId },
    });

    if (!profile) {
      throw new AppError('Perfil não encontrado');
    }

    profile.description = description;
    profile.phoneNumber = phoneNumber;
    profile.city = city;
    profile.state = state;
    profile.street = street;
    profile.cep = cep;
    profile.addressNumber = addressNumber;
    profile.addressComplement = addressComplement;

    return profileRepository.save(profile);
  }
}
