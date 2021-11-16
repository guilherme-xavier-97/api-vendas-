import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';

//This library compares date datas, like, after 1 hour, what i do? befere 2 hours, what will work?
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}
export default class ResetPassword {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokenRepository = getCustomRepository(UserTokensRepository);
    const userToken = await usersTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('O Token informado não existe', 400);
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('O usuário informado não existe', 400);
    }

    const tokenCreatedAt = userToken.created_at;

    /*the firts field is the date reference and the second field is how much time
    will pass after the reference */
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado!');
    }

    user.password = await hash(password, 8);

    await usersRepository.save(user);

    console.log(token);
  }
}
