import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Orders from '../../../orders/typeorm/entitites/Orders';
import Product from '@modules/products/typeorm/entities/Product';
//A entidade OrdersProducts é uma entidade associativa,que relaciona outras duas tabelas, Orders e Products
@Entity('orders_products')
class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /**O atributo order, é a chave estrangeira que relaciona  a tabela Orders com a tabela de OrdersProducts.
   * É uma relação de muitos para um,já que pode ter muitos orders dentro da tabela OrdersProducts.
   * O campo id é a referencia da tabela Orders */
  @ManyToOne(() => Orders, order => order.order_products)
  @JoinColumn({ name: 'id' })
  order: Orders;

  /**O atributo product, é a chave estrangeira que relaciona  a tabela Product com a tabela de OrdersProducts.
   * É uma relação de muitos para um,já que pode ter muitos products dentro da tabela OrdersProducts.
   * O campo id é a referencia da tabela Product */
  @ManyToOne(() => Product, product => product.order_products)
  @JoinColumn({ name: 'id' })
  product: Product;
}

export default OrdersProducts;
