import { TypedResponse } from './typed-controller';
import { ResponseMessage } from '../interface/response-entity';

export const errorResponse = (
	e: unknown,
	res: TypedResponse<ResponseMessage>
) => {
	const errors = (e as Error).message;
	return res.status(500).json({ message: errors });
};
