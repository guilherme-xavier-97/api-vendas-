import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/middleware/isAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();
//using this method, we ensure the user will be authenticated to do changes in profile
profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      new_password: Joi.string().optional(),
      old_password: Joi.string(),
      /*If a new password is created, it needs confirmation  */
      password_confirmation: Joi.string()
        .valid(Joi.ref('new_password'))
        .when('new_password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  profileController.update,
);

export default profileRouter;
