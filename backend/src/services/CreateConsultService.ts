import { getRepository } from 'typeorm';

import Consult from '../models/Consult';
import User from '../models/User';
import Pacient from '../models/Pacient';

import ConvertStringHourToInt from '../utils/ConvertStringHourToInt';

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
