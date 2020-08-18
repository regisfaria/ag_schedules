import { getRepository } from 'typeorm';

import SpecialistProfile from '../../../models/SpecialistProfile';

import AppError from '../../../errors/AppError';

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

export default class UpdateSpecialistProfileService {
  public async execute({
    userId,
    description,
    phoneNumber,
    city,
    state,
    street,
    cep,
    addressNumber,
  }: Request): Promise<SpecialistProfile> {
    const specialistProfileRepositry = getRepository(SpecialistProfile);

    const specialistProfile = await specialistProfileRepositry.findOne({
      where: { userId },
    });

    if (!specialistProfile) {
      throw new AppError('Perfil não encontrado');
    }

    specialistProfile.description = description;
    specialistProfile.phoneNumber = phoneNumber;
    specialistProfile.city = city;
    specialistProfile.state = state;
    specialistProfile.street = street;
    specialistProfile.cep = cep;
    specialistProfile.addressNumber = addressNumber;

    return specialistProfileRepositry.save(specialistProfile);
  }
}
