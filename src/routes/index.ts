import { Router } from 'express';
import UserRoutes from './user.routes';
import AuthRoutes from './auth.routes';
import ProductRoutes from './product.routes';

const routes = Router();

routes.use('/api/v1/users', UserRoutes);
routes.use('/api/v1/auth', AuthRoutes);
routes.use('/api/v1', ProductRoutes);

export default routes;
