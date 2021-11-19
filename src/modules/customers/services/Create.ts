import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customers from '../typeorm/entities/Customers';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}
export default class Create {
  public async execute({ name, email }: IRequest): Promise<Customers> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('O Email informado já está sendo utilizado', 400);
    }

    const customer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);
    return customer;
  }
}
