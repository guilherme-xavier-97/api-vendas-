import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

class Read {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.find();

    if (!user) {
      throw new AppError('Erro ao listar usuários', 400);
    }
    return user;
  }
}

export default Read;
