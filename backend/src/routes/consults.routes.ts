import { Router } from 'express';
import { getRepository } from 'typeorm';

import Consult from '../models/Consult';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateConsultService from '../services/Consults/CreateConsultService';
import DeleteConsultService from '../services/Consults/DeleteConsultService';
import ConvertHourToStringService from '../services/Consults/ConvertHourToStringService';

const consultsRouter = Router();

consultsRouter.use(ensureAuthenticated);

consultsRouter.get('/', async (request, response) => {
  const consultsRepository = getRepository(Consult);

  const unparsedConsults = await consultsRepository.find();

  const convertHourToString = new ConvertHourToStringService();

  const consults = convertHourToString.execute(unparsedConsults);

  return response.json(consults);
});

consultsRouter.get('/:specialistId', async (request, response) => {
  const specialistId = request.params;

  const consultsRepository = getRepository(Consult);

  const consults = await consultsRepository.find({
    where: specialistId,
  });

  return response.json(consults);
});

consultsRouter.get('/:specialistId/date', async (request, response) => {
  const { specialistId } = request.params;
  const { day, month, year } = request.body;

  const consultsRepository = getRepository(Consult);

  const parseDay = String(day).padStart(2, '0');
  const parseMonth = String(month).padStart(2, '0');

  const findDate = `${year}-${parseMonth}-${parseDay}`;

  const consults = await consultsRepository.find({
    where: { specialistId, date: findDate },
  });

  return response.json(consults);
});

consultsRouter.post('/', async (request, response) => {
  const {
    userId,
    specialistId,
    pacientId,
    date,
    hour,
    payment,
    status,
  } = request.body;

  const createConsult = new CreateConsultService();

  const consult = await createConsult.execute({
    userId,
    specialistId,
    pacientId,
    date,
    hour,
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
