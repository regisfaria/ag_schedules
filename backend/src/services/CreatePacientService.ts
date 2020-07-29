import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Pacient from '../models/Pacient';

interface Request {
  name: string;
  bornDate: Date | string;
  cpf: string;
  gender: string;
  phoneNumber: string;
  city: string;
  state: string;
  street: string;
  addressNumber: string;
  cep: string;
  description: string;
}

class CreatePacientService {
  public async execute({
    name,
    bornDate,
    cpf,
    gender,
    phoneNumber,
    city,
    state,
    street,
    addressNumber,
    cep,
    description,
  }: Request): Promise<Pacient> {
    const pacientsRepository = getRepository(Pacient);

    const cpfExists = await pacientsRepository.findOne({ where: { cpf } });

    if (cpfExists) {
      throw new AppError('CPF ja existente no sistema.');
    }

    const pacient = pacientsRepository.create({
      name,
      bornDate,
      cpf,
      gender,
      phoneNumber,
      city,
      state,
      street,
      addressNumber,
      cep,
      description,
    });

    await pacientsRepository.save(pacient);

    return pacient;
  }
}

export default CreatePacientService;
