import { Router } from 'express';
import { findAll } from '../controllers/user.controller';
import { isAuthenticate } from '../middleware/is-authenticate';
import { RestrictTo } from '../middleware/restrict-to';

const router = Router();

router.get('/', isAuthenticate, RestrictTo('admin'), findAll);

export default router;
