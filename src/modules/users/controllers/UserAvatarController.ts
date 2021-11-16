import { Request, Response } from 'express';
import UpdateAvatar from '../services/UpdateAvatar';

//import { ReadOne } from '../services/ReadOne';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const update = new UpdateAvatar();

    const user = update.execute({
      UserId: Number(request.user.id),
      AvatarFilename: request.file?.filename,
    });

    return response.json(user);
  }
}
