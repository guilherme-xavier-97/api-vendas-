import { Request, Response } from 'express';
import Read from '../services/Read';
import ReadOne from '../services/ReadOne';
import Create from '../services/Create';
import Update from '../services/Update';
import Delete from '../services/Delete';

export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomers = new Read();
    const customer = await listCustomers.execute();

    return response.json(customer);
  }

  public async ReadOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const readOne = new ReadOne();
    const customer = await readOne.execute({ id });

    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const create = new Create();
    const customer = await create.execute({ name, email });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;
    const update = new Update();
    const customer = await update.execute({ id, name, email });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deletar = new Delete();
    await deletar.execute({ id });

    return response.json([]);
  }
}
