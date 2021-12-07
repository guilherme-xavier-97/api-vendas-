import { Request, Response } from 'express';
import Create from '../services/Create';
import Read from '../services/Read';

//import { ReadOne } from '../services/ReadOne';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new Read();
    // eslint-disable-next-line no-console
    console.log(request.user.id);

    const user = await listUsers.execute();

    return response.json(user);
  }

  /* DEIXA PRA FAZER DEPOIS
  public async readOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const readOne = new ReadOne();
    const user = await readOne.execute({ id });

    return response.json(user);
  }

  */

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const create = new Create();
    const user = await create.execute({ name, email, password });

    return response.json(user);
  }
}
