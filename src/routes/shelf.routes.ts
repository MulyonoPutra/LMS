import { Router } from 'express';
import {
	create,
	findAll,
	findById,
	remove,
} from '../controllers/shelf.controller';

const router = Router();

router.get('/', findAll);
router.get('/:id', findById);

router.post('/', create);
router.delete('/:id', remove);

export default router;
