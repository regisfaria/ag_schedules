import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';
import CreateProfileService from '../services/CreateProfileService';
import DeleteUserService from '../services/DeleteUserService';
import DeleteProfileService from '../services/DeleteProfileService';

import User from '../models/User';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);

  const users = await userRepository.find();

  // eslint-disable-next-line no-param-reassign
  users.forEach(user => delete user.password);

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password, type } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
    type,
  });

  const createProfile = new CreateProfileService();

  const profile = await createProfile.execute(user);

  delete profile.user.password;

  return response.json(profile);
});

usersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteProfile = new DeleteProfileService();
  const deleteUser = new DeleteUserService();

  await deleteProfile.execute(id);
  await deleteUser.execute(id);

  return response.json(204).send;
});

export default usersRouter;
