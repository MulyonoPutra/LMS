import { Router } from 'express';
import UserRoutes from './user.routes';
import AuthRoutes from './auth.routes';

const routes = Router();

routes.use('/api/v1/users', UserRoutes);
routes.use('/api/v1/auth', AuthRoutes);

export default routes;
