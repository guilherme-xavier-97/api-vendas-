import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customers from '../typeorm/entities/Customers';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

class Read {
  public async execute(): Promise<Customers[]> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const customer = await customerRepository.find();

    if (!customer) {
      throw new AppError('Erro ao listar clientes', 400);
    }
    return customer;
  }
}

export default Read;
