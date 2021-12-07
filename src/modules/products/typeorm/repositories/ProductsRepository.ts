import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

@EntityRepository(Product)
class ProductsRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: {
        name,
      },
    });
    return product;
  }

  public async findAllProducts(products: IFindProducts[]): Promise<Product[]> {
    //can map the entity and callback just what you want, in this case, the id
    const productsIds = products.map(product => product.id);

    const productsExists = await this.find({
      where: {
        id: In(productsIds),
      },
    });
    return productsExists;
  }
}

export default ProductsRepository;
