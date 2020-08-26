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
  const { date } = request.body;

  const consultsRepository = getRepository(Consult);

  const consults = await consultsRepository.find({
    where: { specialistId, date },
  });

  return response.json(consults);
});

consultsRouter.post('/', async (request, response) => {
  const {
    specialist,
    pacient,
    consultDate,
    consultHour,
    payment,
    status,
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
