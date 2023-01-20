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
import {
	bookPopulated,
	categoryPopulated,
	hideUserProps,
	shelfPopulated,
	userPopulated,
} from '../utility/custom-response';

export type BorrowResponseType = TypedResponse<ResponseMessage | Partial<ResponseEntity<Borrow[]>>>;
export type BorrowFindOneResponseType = TypedResponse<ResponseMessage | Partial<ResponseEntity<Borrow | null>>>;
export type BorrowRequestType = TypedRequest<Record<string, never>, Borrow>;

export const findAll = async (req: Request, res: BorrowResponseType, next: NextFunction) => {
	try {
		const data = await borrowSchema
																	.find({})
																	.populate(userPopulated)
																	.populate(bookPopulated)
																	.select('-__v')
																	.exec() as unknown as Borrow[];

		return res.status(200).json({
			message: 'Successfully retrieved!',
			data,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const findById = async (req: Request, res: BorrowFindOneResponseType, next: NextFunction) => {
	try {
		const { id } = req.params;
		const data = await borrowSchema
																		.findOne({ _id: id })
																		.populate(userPopulated)
																		.populate(bookPopulated)
																		.select('-__v')
																		.exec() as unknown as Borrow;

		return res.status(200).json({
			message: 'Successfully retrieved',
			data,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId, bookId } = req.body;
		const user = (await userSchema
																	.findById(userId)
																	.select(hideUserProps)) as IUser;

		const book = (await bookSchema
																	.findById(bookId)
																	.populate(shelfPopulated)
																	.populate(categoryPopulated)
																	.select('-__v')) as Book;

		const newBorrow = await borrowSchema.create({
					...req.body,
					user: {
						_id: user.id,
					},
					book: {
						_id: book.id,
					},
			}
		);

		return res.status(201).json({
			message: 'New Category Created!',
			data: newBorrow,
		});
		
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};
