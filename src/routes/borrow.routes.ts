import { Router } from 'express';
import { create, findAll, findById } from '../controllers/borrow.controller';

const router = Router();

router.get('/', findAll);
router.get('/:id', findById);
router.post('/', create);

export default router;
