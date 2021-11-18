import { Request, Response } from 'express';
import ShowProfile from '../services/ShowProfile';
import UpdateProfile from '../services/UpdateProfile';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfile();
    const user_id = request.user.id;

    const user = await showProfile.execute({ user_id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, new_password, old_password } = request.body;

    const updateProfile = new UpdateProfile();
    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      new_password,
      old_password,
    });

    return response.json(user);
  }
}
