import UserSchema from '../models/user.schema';
import { errorResponse } from '../utility/error-response';
import { Request } from 'express';
import { IUserDetails } from '../interface/user';
import { UserResponseType } from '../type/user.type';

export const findAll = async (req: Request, res: UserResponseType) => {
	const hideAttributes = {
		__v: 0,
		createdAt: 0,
		updatedAt: 0,
		password: 0,
		refreshToken: 0,
	};

	try {
		const data: IUserDetails[] = await UserSchema.find({}, hideAttributes);
		return res.status(200).json({
			message: 'Successfully retrieved!',
			data,
		});
	} catch (e) {
		errorResponse(e, res);
	}
};
