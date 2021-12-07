import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';

class Read {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository);
    //const productsRepository = getRepository(Product);

    const product = await productsRepository.find();

    if (!product) {
      throw new AppError('Produtos não encontrados', 400);
    }

    return product;
  }
}

export default Read;
