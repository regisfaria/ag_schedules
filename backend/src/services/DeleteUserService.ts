import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import User from '../models/User';

class DeleteUserService {
  public async execute(id: string): Promise<void> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('Nenhum usuario foi encontrado com esse ID.');
    }

    await usersRepository.remove(user);
  }
}

export default DeleteUserService;
