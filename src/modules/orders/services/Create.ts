import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Orders from '../typeorm/entitites/Orders';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';
import { CustomersRepository } from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';

interface IProduct {
  id: string;
  quantity: number;
}
interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export default class Create {
  public async execute({ customer_id, products }: IRequest): Promise<Orders> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductsRepository);
    const customerExists = await customersRepository.findById(customer_id);
    const productsExists = await productsRepository.findAllProducts(products);
    const productsIdsExists = productsExists.map(product => product.id);
    const checkInexistentsProducts = products.filter(
      product => !productsIdsExists.includes(product.id),
    );
    /**
     * The first check is to know if the selected product really exists. If its true, the second
     * check is to compare if the selected quantity is bigger than the quantity in my stock. If its
     * true, cannot finish the sale
     */
    const quantityAvaliable = products.filter(
      product =>
        productsExists.filter(product2 => product2.id === product.id)[0]
          .quantity < product.quantity,
    );

    if (!customerExists) {
      throw new AppError('O cliente informado não foi encontrado', 400);
    }

    if (!productsExists.length) {
      throw new AppError('O produto informado não foi encontrado', 400);
    }

    if (checkInexistentsProducts.length) {
      throw new AppError(
        `Não foi possível encontrar o produto ${checkInexistentsProducts[0].id}`,
        400,
      );
    }

    if (quantityAvaliable.length) {
      throw new AppError(
        `A quantidade ${quantityAvaliable[0].quantity} não está disponivel
      para ${quantityAvaliable[0].id}`,
        400,
      );
    }

    const serializedProducts = products.map(product => ({
      id: product.id,
      quantity: product.quantity,
      price: productsExists.filter(product2 => product2.id === product.id)[0]
        .price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.id,
      quantity:
        productsExists.filter(product2 => product2.id === product.id)[0]
          .quantity - product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}
