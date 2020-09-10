import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import Pacient from '../../models/Pacient';
import User from '../../models/User';

interface Request {
  createdById: string;
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
    createdById,
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

    const user = await usersRepository.findOne(createdById);

    if (!user || user.type === 'indicator' || user.type === 'specialist') {
      throw new AppError(
        'Especialistas/Indicadores nao podem criar um paciente',
        401,
      );
    }

    const cpfExists = await pacientsRepository.findOne({ where: { cpf } });

    if (cpfExists) {
      throw new AppError('CPF ja existente no sistema.');
    }

    const pacient = pacientsRepository.create({
      createdBy: user,
      createdById,
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
