import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';
import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import ProductsRepository from '@modules/products/typeorm/repositories/ProductsRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class Create {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductsRepository);

    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Cliente não encontrado', 400);
    }

    const productsExists = await productsRepository.findAllProducts(products);

    if (!productsExists.length) {
      throw new AppError('Produto não encontrado', 400);
    }

    /**
     The variable "productsIdsExists" map all the products array list by your ids
     The variable "checkInexistentsProducts" filter the array list and
     check if some product couldn't be founded and show what this product was
     */
    const productsIdsExists = productsExists.map(product => product.id);
    const checkInexistentsProducts = products.filter(
      product => !productsIdsExists.includes(product.id),
    );

    if (checkInexistentsProducts.length) {
      throw new AppError('O produto fgss não foi encontrado', 400);
    }

    /**
     Product Id sent must be exactly equal to product Id that we ensured exists in variable
     "productsExists". If they're equal, we check if the quantity requested by client is
     less than quantity in my stock
     */

    const quantityAvaliable = products.filter(
      product =>
        productsExists.filter(product2 => product2.id === product.id)[0]
          .quantity < product.quantity,
    );

    if (quantityAvaliable.length) {
      throw new AppError(
        `${quantityAvaliable[0].quantity} é uma quantidade maior do que temos em estoque`,
        400,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productsExists.filter(produto2 => produto2.id === product.id)[0]
        .price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        productsExists.filter(produto2 => produto2.id === product.product_id)[0]
          .quantity - product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}

export default Create;
