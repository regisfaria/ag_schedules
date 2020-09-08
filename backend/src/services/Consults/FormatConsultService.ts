/* eslint-disable no-param-reassign */
import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import Consult from '../../models/Consult';
import User from '../../models/User';
import Pacient from '../../models/Pacient';
import SpecialistProfile from '../../models/SpecialistProfile';

class FormatConsultService {
  public async execute(consult: Consult): Promise<Consult> {
    if (!consult) {
      throw new AppError('Nenhuma consulta encontrada.');
    }
    const usersRepository = getRepository(User);
    const pacientsRepository = getRepository(Pacient);
    const specialistProfilesRepository = getRepository(SpecialistProfile);

    const hourMod = consult.hour % 60;
    const endHourMod = (consult.hour + 60) % 60;
    if (hourMod === 0) {
      const parsedHour = consult.hour / 60;
      const parsedEndHour = endHourMod / 60;

      const formatedHour = `${parsedHour}:00`;
      const formatedEndHour = `${parsedEndHour}:00`;

      consult.formatedHour = formatedHour;
      consult.formatedEndHour = formatedEndHour;

      delete consult.hour;
    } else {
      const parsedHour = Math.floor(consult.hour / 60);
      const parsedEndHour = Math.floor((consult.hour + 60) / 60);

      const formatedHour = `${parsedHour}:${hourMod}`;
      const formatedEndHour = `${parsedEndHour}:${endHourMod}`;

      consult.formatedHour = formatedHour;
      consult.formatedEndHour = formatedEndHour;

      delete consult.hour;
    }

    const pacient = await pacientsRepository.findOne({
      where: { id: consult.pacientId },
    });
    consult.pacientName = pacient?.name;

    const specialist = await usersRepository.findOne({
      where: { id: consult.specialistId },
    });
    consult.specialistName = specialist?.name;

    const specialistProfile = await specialistProfilesRepository.findOne({
      where: { userId: consult.specialistId },
    });
    consult.specialistImgUrl = `http://localhost:3333/files/${specialistProfile?.image}`;

    const supervisor = await usersRepository.findOne({
      where: { id: consult.createdById },
    });
    consult.createdBy = supervisor?.name;

    return consult;
  }
}

export default FormatConsultService;
