import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';
import CreateProfileService from '../services/CreateProfileService';

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
  const { name, login, password, privileges } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    login,
    password,
    privileges,
  });

  const createProfile = new CreateProfileService();

  const profile = await createProfile.execute(user);

  return response.json({ user, profile });
});

usersRouter.delete('/', async (request, response) => {
  // TO DO
});

export default usersRouter;
