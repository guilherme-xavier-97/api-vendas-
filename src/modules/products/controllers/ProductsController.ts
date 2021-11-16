import { Request, Response } from 'express';
import Create from '../services/Create';
import Delete from '../services/Delete';
import Read from '../services/Read';
import ReadOne from '../services/ReadOne';
import Update from '../services/Update';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new Read();
    const product = await listProducts.execute();

    return response.json(product);
  }

  public async readOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const readOne = new ReadOne();
    const product = await readOne.execute({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const create = new Create();
    const product = await create.execute({ name, price, quantity });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;
    const update = new Update();
    const product = await update.execute({ id, name, price, quantity });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deletar = new Delete();
    await deletar.execute({ id });

    return response.json([]);
  }
}
