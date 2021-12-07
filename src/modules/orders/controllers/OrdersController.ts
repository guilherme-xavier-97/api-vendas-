import { Request, Response } from 'express';
import Create from '../services/Create';
import ReadOne from '../services/ReadOne';

export default class OrdersController {
  public async readOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const readOne = new ReadOne();
    const order = await readOne.execute({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;
    const create = new Create();
    const order = await create.execute({ customer_id, products });

    return response.json(order);
  }
}
