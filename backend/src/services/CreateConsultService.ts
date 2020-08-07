import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Consult from '../models/Consult';
import User from '../models/User';
import Pacient from '../models/Pacient';

interface Request {
  userId: string;
  specialistId: string;
  pacientId: string;
  date: Date;
  hour: string;
  payment: string;
  status: string;
}

class CreateConsultService {
  public async execute({
    userId,
    specialistId,
    pacientId,
    date,
    hour,
    payment,
    status,
  }: Request): Promise<Consult> {
    const consultsRepository = getRepository(Consult);
    const usersRepository = getRepository(User);
    const pacientsRepository = getRepository(Pacient);

    const [unparsedHour, unparsedMinutes] = hour.split(':');

    const parsedHour = Number(unparsedHour) * 60 + Number(unparsedMinutes);

    const consultAlreadyScheduled = await consultsRepository.findOne({
      where: { hour: parsedHour },
    });

    if (consultAlreadyScheduled) {
      throw new AppError('Ja existe uma consulta marcada neste horario');
    }
    const pacient = await pacientsRepository.findOne(pacientId);
    const specialist = await usersRepository.findOne(specialistId);

    const consult = consultsRepository.create({
      createdBy: userId,
      specialist,
      specialistId,
      pacient,
      pacientId,
      date,
      hour: parsedHour,
      payment,
      status,
    });

    await consultsRepository.save(consult);

    return consult;
  }
}

export default CreateConsultService;
