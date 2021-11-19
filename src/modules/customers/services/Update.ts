import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customers from '../typeorm/entities/Customers';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class Update {
  public async execute({ id, name, email }: IRequest): Promise<Customers> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Cliente não encontrado', 400);
    }

    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists && emailExists.id != id) {
      throw new AppError('O email informado já está sendo utilizado');
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}

export default Update;
