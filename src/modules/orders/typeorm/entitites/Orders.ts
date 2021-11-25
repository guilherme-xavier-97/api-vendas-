import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import Customer from '../../../customers/typeorm/entities/Customers';
import OrdersProducts from './OrdersProducts';

@Entity('orders')
class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /* O atributo customer é a chave estrangeira que relaciona a tabela de customers e orders. Essa relação
  é de muitos para um , ou seja um cliente pode ter varias ordens de pedido.
  */
  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  /**o atributo order_products é have estrangeira da tabela OrdersProducts. A relação é de um para muitos,
   * já que um order pode conter vários produtos.
   */
  @OneToMany(() => OrdersProducts, order_products => order_products.order, {
    cascade: true,
  })
  order_products: OrdersProducts[];
}

export default Orders;
