import { getRepository } from 'typeorm';

import { hash } from 'bcryptjs';
import User from '../../models/User';

import AppError from '../../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
  type: 'admin';
  active: boolean;
}

export default class CreateAdminUserService {
  public async execute({
    name,
    email,
    password,
    type,
    active,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const emailExists = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (emailExists) {
      throw new AppError('E-mail em uso, tente outro e-mail.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      type,
      active,
    });

    await usersRepository.save(user);

    return user;
  }
}
