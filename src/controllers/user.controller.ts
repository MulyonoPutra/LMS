import { NextFunction, Request } from 'express';
import AppError from 'src/utility/app-error';

import { IUserDetails } from '../interface/user';
import UserSchema from '../models/user.schema';
import { FindOneUserResponseType, UserResponseType } from '../type/user.type';
import { errorResponse } from '../utility/error-response';

const hideAttributes = {
	__v: 0,
	createdAt: 0,
	updatedAt: 0,
	password: 0,
	refreshToken: 0,
};

export const findAll = async (res: UserResponseType, next: NextFunction) => {
	try {
		const data: IUserDetails[] = await UserSchema.find({}, hideAttributes);
		return res.status(200).json({
			message: 'Successfully retrieved!',
			data,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};


export const findById = async (req: Request, res: FindOneUserResponseType, next: NextFunction) => {
	try {
		const { id } = req.params;
		const data = await UserSchema.findOne({ _id: id }, hideAttributes);
		return res.status(200).json({
			message: 'Data successfully retrieved',
			data,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
}