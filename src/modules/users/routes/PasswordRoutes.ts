import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ForgotPassword from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const passwordController = new ForgotPassword();
const resetPassword = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  passwordController.create,
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),

      /** Here we require that user write twice your password, to confirm if the two passwords are really
       * the same text
       */
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPassword.create,
);
export default passwordRouter;
