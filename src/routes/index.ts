import { Router } from 'express';

import AuthRoutes from './auth.routes';
import ProductRoutes from './product.routes';
import UserRoutes from './user.routes';
import categoryRoutes from './category.routes';
import BookRoutes from './book.routes';
import ShelfRoutes from './shelf.routes';
import borrowRoutes from './borrow.routes';
import returnsRoutes from './returns.routes';

const routes = Router();

routes.use('/api/v1/users', UserRoutes);
routes.use('/api/v1/auth', AuthRoutes);
routes.use('/api/v1/product', ProductRoutes);
routes.use('/api/v1/category', categoryRoutes);
routes.use('/api/v1/book', BookRoutes);
routes.use('/api/v1/shelf', ShelfRoutes);
routes.use('/api/v1/borrow', borrowRoutes);
routes.use('/api/v1/returns', returnsRoutes);

export default routes;
