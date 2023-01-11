import { Router } from 'express';

import { findAll, findById } from '../controllers/user.controller';
import { isAuthenticate } from '../middleware/is-authenticate';
import { RestrictTo } from '../middleware/restrict-to';

const router = Router();

router.get('/', isAuthenticate, RestrictTo('admin'), findAll);
router.get('/:id', isAuthenticate, RestrictTo('admin'), findById);

export default router;
