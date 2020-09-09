import { getRepository } from 'typeorm';
import { isBefore, parseISO } from 'date-fns';

import Consult from '../../models/Consult';

import ConvertStringHourToInt from '../../utils/ConvertStringHourToInt';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  consultDate: string;
  consultHour: string;
  payment: string;
  status: string;
}

export default class UpdateConsultService {
  public async execute({
    id,
    consultDate,
    consultHour,
    payment,
    status,
  }: Request): Promise<Consult> {
    const consultsRepository = getRepository(Consult);

    const consult = await consultsRepository.findOne(id);

    if (!consult) {
      throw new AppError('Consulta não encontrada');
    }

    if (isBefore(parseISO(consultDate), new Date())) {
      throw new AppError(
        'Voce nao pode alterar a consulta para uma data no passado',
      );
    }

    if (consultDate) {
      consult.date = parseISO(consultDate);
    }
    if (consultHour) {
      consult.hour = ConvertStringHourToInt(consultHour);
    }
    if (payment) {
      consult.payment = payment;
    }
    if (status) {
      consult.status = status;
    }

    return consultsRepository.save(consult);
  }
}
