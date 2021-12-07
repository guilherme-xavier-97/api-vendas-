/* eslint-disable prettier/prettier */
import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/middleware/isAuthenticated';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(isAuthenticated);

ordersRouter.get(
     '/:id',
     celebrate({
       [Segments.PARAMS]: {
         id: Joi.string().uuid().required(),
       },
     }),
     ordersController.readOne,
  );

  ordersRouter.post(
      '/',
      celebrate({
        [Segments.BODY]: {
          customer_id: Joi.string().uuid().required(),
          products: Joi.required(),
        }
      }),
      ordersController.create
  );


export default ordersRouter;
