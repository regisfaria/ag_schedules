import { getRepository } from 'typeorm';

import Profile from '../models/Profile';

import AppError from '../errors/AppError';

interface Request {
  userId: string;
  phoneNumber: string;
  city: string;
  state: string;
  street: string;
  addressNumber: string;
  cep: string;
  description: string;
}

export default class UpdateUserAvatarServie {
  public async execute({
    userId,
    description,
    phoneNumber,
    city,
    state,
    street,
    cep,
    addressNumber,
  }: Request): Promise<Profile> {
    const profileRepositry = getRepository(Profile);

    const profile = await profileRepositry.findOne({
      where: { userId },
    });

    if (!profile) {
      throw new AppError('Perfil Não Encontrado');
    }

    profile.description = description;
    profile.phoneNumber = phoneNumber;
    profile.city = city;
    profile.state = state;
    profile.street = street;
    profile.cep = cep;
    profile.addressNumber = addressNumber;

    return profileRepositry.save(profile);
  }
}
