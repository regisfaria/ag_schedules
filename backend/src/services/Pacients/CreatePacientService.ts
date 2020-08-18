import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import Pacient from '../../models/Pacient';
import User from '../../models/User';

interface Request {
  supervisorId: string;
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
    supervisorId,
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
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(supervisorId);

    if (!user || user.type !== 'supervisor') {
      throw new AppError('Apenas supervisores podem criar um paciente', 401);
    }

    const cpfExists = await pacientsRepository.findOne({ where: { cpf } });

    if (cpfExists) {
      throw new AppError('CPF ja existente no sistema.');
    }

    const pacient = pacientsRepository.create({
      supervisor: user,
      supervisorId,
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
