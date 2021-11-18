import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: string;
}

class ShowProfile {
  public async execute({ user_id }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado', 400);
    }
    return user;
  }
}

export default ShowProfile;
