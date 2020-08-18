import { Router } from 'express';
import { getRepository } from 'typeorm';

import Pacient from '../models/Pacient';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreatePacientService from '../services/Pacients/CreatePacientService';
import DeletePacientService from '../services/Pacients/DeletePacientService';

const pacientsRouter = Router();

pacientsRouter.use(ensureAuthenticated);

pacientsRouter.get('/', async (request, response) => {
  const pacientsRepository = getRepository(Pacient);

  const pacient = await pacientsRepository.find();

  return response.json(pacient);
});

pacientsRouter.get('/supervisor', async (request, response) => {
  const supervisorId = request.user.id;

  const pacientsRepository = getRepository(Pacient);

  const pacients = await pacientsRepository.find({ where: { supervisorId } });

  return response.json(pacients);
});

pacientsRouter.post('/', async (request, response) => {
  const {
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
  } = request.body;

  const supervisorId = request.user.id;

  const createPacient = new CreatePacientService();

  const pacient = await createPacient.execute({
    supervisorId,
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

  return response.json(pacient);
});

pacientsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deletePacient = new DeletePacientService();

  await deletePacient.execute(id);

  return response.json(204).send;
});

export default pacientsRouter;
