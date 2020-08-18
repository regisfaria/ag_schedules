import { getRepository } from 'typeorm';

import SupervisorProfile from '../../../models/SupervisorProfile';

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

export default class UpdateSupervisorProfileService {
  public async execute({
    userId,
    description,
    phoneNumber,
    city,
    state,
    street,
    cep,
    addressNumber,
  }: Request): Promise<SupervisorProfile> {
    const supervisorProfileRepositry = getRepository(SupervisorProfile);

    const supervisorProfile = await supervisorProfileRepositry.findOne({
      where: { userId },
    });

    if (!supervisorProfile) {
      throw new AppError('Perfil não encontrado');
    }

    supervisorProfile.description = description;
    supervisorProfile.phoneNumber = phoneNumber;
    supervisorProfile.city = city;
    supervisorProfile.state = state;
    supervisorProfile.street = street;
    supervisorProfile.cep = cep;
    supervisorProfile.addressNumber = addressNumber;

    return supervisorProfileRepositry.save(supervisorProfile);
  }
}
