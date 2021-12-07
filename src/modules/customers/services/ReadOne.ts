import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customers from '../typeorm/entities/Customers';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}
export default class ReadOne {
  public async execute({ id }: IRequest): Promise<Customers | undefined> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const customer = await customerRepository.findOne(id);

    if (!customer) {
      throw new AppError('Cliente não encontrado', 400);
    }
    return customer;
  }
}
