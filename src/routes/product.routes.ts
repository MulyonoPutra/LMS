import { Router } from 'express';
import { isAuthenticate } from '../middleware/is-authenticate';
import { RestrictTo } from '../middleware/restrict-to';
import { create, findAll } from '../controllers/product.controller';

const router = Router();

router.get('/', isAuthenticate, RestrictTo('user'), findAll);
router.post('/', isAuthenticate, RestrictTo('user'), create);

export default router;
