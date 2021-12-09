import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  // These two variables are optionals, because the user can change only the name or email, not the password
  new_password?: string;
  old_password?: string;
}

class UpdateProfile {
  public async execute({
    user_id,
    name,
    email,
    new_password,
    old_password,
  }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado', 400);
    }

    const emailExists = await userRepository.findByEmail(email);

    /* Here we verify if the email exists. But the user can change others parameters (name or password)
     and use the same email adress. In this case, of course the email will exists, he's from the own user.
    Because of that is necessary a second verification. If the email owner havent the same id from
    the request user, they arent the same person, so, cannot change anything  */
    if (emailExists && emailExists.id != user_id) {
      throw new AppError('O email informado já está sendo utilizado');
    }

    if (new_password && !old_password) {
      throw new AppError('Insira a senha antiga para conseguir trocá-la');
    }

    if (new_password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('A senha antiga está incorreta');
      }

      user.password = await hash(new_password, 8);
    }

    user.name = name;
    user.email = email;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateProfile;
