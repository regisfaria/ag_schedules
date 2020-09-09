import { getRepository } from 'typeorm';

import { hash } from 'bcryptjs';
import User from '../../models/User';

import AppError from '../../errors/AppError';

interface Request {
  currentUserId: string;
  name: string;
  email: string;
  password: string;
  type: 'admin' | 'supervisor' | 'specialist';
  active: boolean;
}

export default class CreateUserService {
  public async execute({
    currentUserId,
    name,
    email,
    password,
    type,
    active,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const currentUser = await usersRepository.findOne(currentUserId);

    if (currentUser?.type === 'specialist') {
      throw new AppError(
        'Usuarios do tipo especialista nao podem criar novos usuarios',
        401,
      );
    }

    /* if (type === 'supervisor' && currentUser?.type !== 'admin') {
      throw new AppError(
        'Apenas usuarios administradores podem criar usuarios supervisores',
        401,
      );
    } */

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
