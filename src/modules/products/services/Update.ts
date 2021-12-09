import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class Update {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const productExists = await productsRepository.findByName(name);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Produto não encontrado', 400);
    }

    if (productExists) {
      throw new AppError('Produto já cadastrado', 400);
    }

    const redisCache = new RedisCache();

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.save(product);
    return product;
  }
}

export default Update;
