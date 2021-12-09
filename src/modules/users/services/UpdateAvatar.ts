import AppError from '@shared/errors/AppError';
import fs from 'fs'; //biblioteca nariva do node para trabalhar com manipulação de arquivos
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import uploadConfig from '@config/upload';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import path from 'path';

interface IRequest {
  UserId: string;
  AvatarFilename?: string;
}
export default class UpdateAvatar {
  public async execute({ UserId, AvatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(UserId);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    /*Essa parte faz a verificação se já existe um avatar pro usuario, se não existir,cria um
    se ja existir, exclui o que ja tem e adiciona outro
    */
    if (user.avatar) {
      const UserAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const UserAvatarFileExists = await fs.promises.stat(UserAvatarFilePath);

      if (UserAvatarFileExists) {
        await fs.promises.unlink(UserAvatarFilePath);
      }
    }

    user.avatar = AvatarFilename!;

    await usersRepository.save(user);

    return user;
  }
}
