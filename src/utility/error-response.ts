import { TypedResponse } from './typed-controller';

export const errorResponse = (
	e: unknown,
	res: TypedResponse<{ message: string }>
) => {
	const errors = (e as Error).message;
	return res.status(500).json({ message: errors });
};
