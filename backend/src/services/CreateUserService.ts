import { getRepository } from 'typeorm';

import { hash } from 'bcryptjs';
import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
  type: string;
}

export default class CreateUserService {
  public async execute({
    name,
    email,
    password,
    type,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const loginExists = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (loginExists) {
      throw new AppError('E-mail em uso, tente outro e-mail.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      type,
    });

    await usersRepository.save(user);

    return user;
  }
}
