import { getRepository } from 'typeorm';
import { isBefore } from 'date-fns';

import Consult from '../models/Consult';
import User from '../models/User';
import Pacient from '../models/Pacient';
import AppError from '../errors/AppError';

import ConvertStringHourToInt from '../utils/ConvertStringHourToInt';
import ConvertDateAndHourtoDate from '../utils/ConvertDateAndHourstoDate';

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

    const parsedHour = ConvertStringHourToInt(hour);

    const pacient = await pacientsRepository.findOne(pacientId);
    const specialist = await usersRepository.findOne(specialistId);
    const currentUser = await usersRepository.findOne(userId);

    // Check if pacient and specialist exist
    if (!pacient) {
      throw new AppError('Paciente Invalido');
    }

    if (!specialist) {
      throw new AppError('Especialista Invalido');
    }

    // Check if pacient and specialist are different
    if (pacientId === specialistId) {
      throw new AppError('Você não pode criar uma consulta para você mesmo!');
    }

    // Check if date is before today
    const dateParseIso = String(date);
    const dateFormated = ConvertDateAndHourtoDate(dateParseIso, hour);

    if (isBefore(dateFormated, Date.now())) {
      throw new AppError('Você não pode criar uma consulta no passado');
    }

    // Check if specialist has a consult in the same date and hour
    const consultInTheSameHour = await consultsRepository.findOne({
      where: {
        specialistId,
        date,
        hour: parsedHour,
      },
    });

    if (consultInTheSameHour) {
      throw new AppError('Horario Indisponivel');
    }

    const consult = consultsRepository.create({
      user: currentUser,
      createdById: userId,
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
