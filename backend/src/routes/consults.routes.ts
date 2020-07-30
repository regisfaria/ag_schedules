import { Router } from 'express';
import { getRepository } from 'typeorm';

import Consult from '../models/Consult';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateConsultService from '../services/CreateConsultService';
import DeleteConsultService from '../services/DeleteConsultService';
import ConvertHourToStringService from '../services/ConvertHourToStringService';

const consultsRouter = Router();

consultsRouter.use(ensureAuthenticated);

consultsRouter.get('/', async (request, response) => {
  const consultsRepository = getRepository(Consult);

  const unparsedConsults = await consultsRepository.find();

  const convertHourToString = new ConvertHourToStringService();

  const consults = convertHourToString.execute(unparsedConsults);

  return response.json(consults);
});

consultsRouter.post('/', async (request, response) => {
  const { specialistId, pacientId, date, hour, payment, status } = request.body;
  const userId = request.user.id;

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
