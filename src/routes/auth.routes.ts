import { Router } from 'express';
import { register, login } from '../controllers';
import { TypedRequest, TypedResponse } from '../utility/typed-controller';
import { IRegister } from '../interface/register';
import { RegisterResponseType } from '../controllers/auth.controller';
import { hasAccess } from '../constants/role-type';

const router = Router();

type RegisterTypeRequest = TypedRequest<Record<string, never>, IRegister>;
type RegisterTypeResponse = TypedResponse<RegisterResponseType>;

// router.post(
// 	'/register-admin',
// 	async (request: RegisterTypeRequest, response: RegisterTypeResponse) => {
// 		await register(request, response, hasAccess('admin'));
// 	}
// );

router.post('/register-admin', register('admin'));
router.post('/register', register());
router.post('/login', login);

export default router;
