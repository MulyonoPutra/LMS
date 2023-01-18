import { Router } from 'express';
import {
	create,
	findAll,
	findById,
	remove,
	update,
} from '../controllers/book.controller';
import upload from '../middleware/upload-multer';

const router = Router();

router.get('/', findAll);
router.get('/:id', findById);
router.delete('/:id', remove);
router.post('/', upload.single('images'), create);
router.put('/:id', upload.single('images'), update);

export default router;
