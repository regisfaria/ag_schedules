/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import Consult from '../models/Consult';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateConsultService from '../services/Consults/CreateConsultService';
import DeleteConsultService from '../services/Consults/DeleteConsultService';
import FormatConsultHoursToStringService from '../services/Consults/FormatConsultHoursToStringService';
import FormatConsultCardService from '../services/Consults/FormatConsultCardService';
import UpdateConsultService from '../services/Consults/UpdateConsultService';

const consultsRouter = Router();

consultsRouter.use(ensureAuthenticated);

consultsRouter.get('/', async (request, response) => {
  const consultsRepository = getRepository(Consult);

  const unparsedConsults = await consultsRepository.find();

  const convertHourToString = new FormatConsultHoursToStringService();

  const consults = convertHourToString.execute(unparsedConsults);

  return response.json(consults);
});

consultsRouter.get('/:specialistId', async (request, response) => {
  const specialistId = request.params;

  const consultsRepository = getRepository(Consult);
  const formatConsult = new FormatConsultCardService();

  const consults: Consult[] = [];
  const unparsedConsults = await consultsRepository.find({
    where: specialistId,
  });

  for (const consult of unparsedConsults) {
    const parsedConsult = await formatConsult.execute(consult);
    consults.push(parsedConsult);
  }

  return response.json(consults);
});

consultsRouter.get(
  '/createdBy/:createdById/:specialistId',
  async (request, response) => {
    const { createdById, specialistId } = request.params;

    const consultsRepository = getRepository(Consult);
    const formatConsult = new FormatConsultCardService();

    const consults: Consult[] = [];
    const unparsedConsults = await consultsRepository.find({
      where: {
        createdById,
        specialistId,
      },
    });

    for (const consult of unparsedConsults) {
      const parsedConsult = await formatConsult.execute(consult);
      consults.push(parsedConsult);
    }

    return response.json(consults);
  },
);

consultsRouter.post('/', async (request, response) => {
  const {
    specialist,
    pacient,
    consultDate,
    consultHour,
    payment,
    status,
    type,
  } = request.body;

  const userId = request.user.id;

  const createConsult = new CreateConsultService();

  const consult = await createConsult.execute({
    userId,
    specialistId: specialist,
    pacientId: pacient,
    date: consultDate,
    hour: consultHour,
    payment,
    status,
    type,
  });

  return response.json(consult);
});

consultsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;

  const { consultDate, consultHour, payment, status } = request.body;

  const updateConsult = new UpdateConsultService();

  const consult = await updateConsult.execute({
    id,
    consultDate,
    consultHour,
    payment,
    status,
  });

  return response.json(consult);
});

consultsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteConsult = new DeleteConsultService();

  await deleteConsult.execute(id);

  return response.json(204).send;
});

export default consultsRouter;
