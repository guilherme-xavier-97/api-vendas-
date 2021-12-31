import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}
export default class Delete {
  public async execute({ id }: IRequest): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findOne(id);

    if (!customer) {
      throw new AppError('Cliente não encontrado', 400);
    }
    await customersRepository.remove(customer);
  }
}
