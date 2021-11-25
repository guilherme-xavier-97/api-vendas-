import OrdersProducts from '@modules/orders/typeorm/entitites/OrdersProducts';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /**o atributo order_products é have estrangeira da tabela OrdersProducts. A relação é de um para muitos,
   * já que um produto pode estar em vários orders.
   */
  @OneToMany(() => OrdersProducts, order_products => order_products.product)
  order_products: OrdersProducts[];
}

export default Product;
