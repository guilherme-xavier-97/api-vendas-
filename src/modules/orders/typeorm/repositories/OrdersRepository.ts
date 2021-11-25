import { EntityRepository, Repository } from 'typeorm';
import Orders from '../entitites/Orders';
import Customer from '../../../customers/typeorm/entities/Customers';

interface IProduct {
  id: string;
  price: number;
  quantity: number;
}
interface IRequest {
  customer: Customer;
  products: IProduct[];
}

@EntityRepository(Orders)
export default class ProductsRepository extends Repository<Orders> {
  public async findById(id: string): Promise<Orders | undefined> {
    const orders = await this.findOne(id, {
      //Can bring others attributes related with the order
      relations: ['order_products', 'customer'],
    });
    return orders;
  }

  public async createOrder({ customer, products }: IRequest): Promise<Orders> {
    const orders = this.create({
      customer,
      order_products: products,
    });
    await this.save(orders);
    return orders;
  }
}
