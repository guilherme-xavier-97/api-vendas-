import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: number;
}
export class ReadOne {
  public async execute({ id }: IRequest): Promise<User | undefined> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findOne(id);

    if (user) {
      throw new AppError('Usuário não encontrado', 400);
    }
    return user;
  }
}
