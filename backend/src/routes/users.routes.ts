/* eslint-disable no-param-reassign */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateUserService from '../services/Users/CreateUserService';
// // Para criar usuarios do tipo ADMIN, descomente abaixo
// import CreateAdminUserService from '../services/Users/CreateAdminUserService';
import DeleteUserService from '../services/Users/DeleteUserService';

import User from '../models/User';

const usersRouter = Router();
usersRouter.use(ensureAuthenticated);

usersRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);

  const users = await userRepository.find();

  users.forEach(user => delete user.password);

  return response.json(users);
});

usersRouter.get('/specialists', async (request, response) => {
  const userRepository = getRepository(User);

  const users = await userRepository.find({
    where: { type: 'specialist' },
  });

  users.forEach(user => delete user.password);

  return response.json(users);
});

usersRouter.get('/supervisors', async (request, response) => {
  const userRepository = getRepository(User);

  const users = await userRepository.find({
    where: {
      type: 'supervisor',
    },
  });

  users.forEach(user => delete user.password);

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password, type } = request.body;
  const currentUserId = request.user.id;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    currentUserId,
    name,
    email,
    password,
    type,
    active: true,
  });

  delete user.password;

  return response.json(user);
});

// // Para criar usuarios do tipo ADMIN, descomente
// usersRouter.post('/admin', async (request, response) => {
//   const { name, email, password, type } = request.body;

//   const createAdminUser = new CreateAdminUserService();

//   const user = await createAdminUser.execute({
//     name,
//     email,
//     password,
//     type,
//     active: true,
//   });

//   delete user.password;

//   return response.json(user);
// });

usersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteUser = new DeleteUserService();

  await deleteUser.execute(id);

  return response.json(204).send;
});

export default usersRouter;
