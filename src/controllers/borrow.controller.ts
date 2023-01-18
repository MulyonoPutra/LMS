import { TypedRequest, TypedResponse } from '../utility/typed-controller';
import { ResponseEntity, ResponseMessage } from '../interface/response-entity';
import { Borrow } from '../interface/borrow';
import borrowSchema from '../models/borrow.schema';
import AppError from '../utility/app-error';
import { NextFunction, Request, Response } from 'express';
import userSchema from '../models/user.schema';
import bookSchema from '../models/book.schema';
import { IUser } from '../interface/user';
import { Book } from '../interface/book';

export type BorrowResponseType = TypedResponse<
	ResponseMessage | Partial<ResponseEntity<Borrow[]>>
>;
export type BorrowFindOneResponseType = TypedResponse<
	ResponseMessage | Partial<ResponseEntity<Borrow | null>>
>;
export type BorrowRequestType = TypedRequest<Record<string, never>, Borrow>;

export const findAll = async (
	req: Request,
	res: BorrowResponseType,
	next: NextFunction
) => {
	try {
		const data = await borrowSchema.find({});
		return res.status(200).json({
			message: 'Successfully retrieved!',
			data,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const findById = async (
	req: Request,
	res: BorrowFindOneResponseType,
	next: NextFunction
) => {
	try {
		const { id } = req.params;
		const data = await borrowSchema.findOne({ _id: id });
		return res.status(200).json({
			message: 'Successfully retrieved',
			data,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const create = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log('--------------------------------');
	console.log(req.body);
	console.log('--------------------------------');

	return res.status(201).json({
		message: 'New Category Created!',
		data: req.body,
	});
};
