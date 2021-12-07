import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customers from '../typeorm/entities/Customers';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

/*This library named "typeorm-pagination"
allow to us separate the files in different pages. Like 5, 10, 15 register per page and
then you click "next" to change the page or "previous" to go back */
interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Customers[];
}

class Read {
  public async execute(): Promise<IPaginateCustomer> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const customer = await customerRepository.createQueryBuilder().paginate();

    if (!customer) {
      throw new AppError('Erro ao listar clientes', 400);
    }
    return customer as IPaginateCustomer;
  }
}

export default Read;
