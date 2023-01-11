import { Router } from 'express';

import AuthRoutes from './auth.routes';
import ProductRoutes from './product.routes';
import UserRoutes from './user.routes';

const routes = Router();

routes.use('/api/v1/users', UserRoutes);
routes.use('/api/v1/auth', AuthRoutes);
routes.use('/api/v1/product', ProductRoutes);

export default routes;
