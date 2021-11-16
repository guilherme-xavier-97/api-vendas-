import { Request, Response } from 'express';
import CreateSession from '../services/CreateSession';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createSession = new CreateSession();
    const user = await createSession.execute({
      email,
      password,
    });

    return response.json(user);
  }
}
