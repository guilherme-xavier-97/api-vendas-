/*import { Router } from 'express';
import productsRouter from '@modules/products/routes/ProductsRoutes';

const routes = Router();

routes.use('/products', productsRouter);

export default routes;
*/

import { Router } from 'express';
import productsRouter from '@modules/products/routes/ProductsRoutes';
import usersRouter from '@modules/users/routes/UsersRoutes';
import sessionRouter from '@modules/users/routes/SessionRoutes';
import passwordRouter from '@modules/users/routes/PasswordRoutes';
const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);

export default routes;
