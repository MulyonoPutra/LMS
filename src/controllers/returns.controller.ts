import returnsSchema from '../models/returns.schema';
import AppError from '../utility/app-error';
import { NextFunction, Request, Response } from 'express';
import userSchema from '../models/user.schema';
import {
	bookPopulated,
	borrowPopulated,
	categoryPopulated,
	hideUserProps,
	shelfPopulated,
	userPopulated,
} from '../utility/custom-response';
import { IUser } from '../interface/user';
import bookSchema from '../models/book.schema';
import { Book } from '../interface/book';
import borrowSchema from '../models/borrow.schema';
import { Borrow } from '../interface/borrow';
import {
	ReturnsFindOneResponseType,
	ReturnsResponseType,
} from '../type/returns.type';

export const findAll = async (
	req: Request,
	res: ReturnsResponseType,
	next: NextFunction
) => {
	try {
		const data = await returnsSchema
			.find({})
			.populate(userPopulated)
			.populate(bookPopulated)
			.populate(borrowPopulated)
			.select('-__v')
			.exec();
		return res.status(200).json({
			message: 'Successfully retrieved!',
			data,
		});
	} catch (err) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const findById = async (
	req: Request,
	res: ReturnsFindOneResponseType,
	next: NextFunction
) => {
	try {
		const { id } = req.params;
		const data = await returnsSchema.findOne({ _id: id });
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
	try {
		const { borrowId, userId, bookId } = req.body;

		const user = (await userSchema
			.findById(userId)
			.select(hideUserProps)) as IUser;
		const book = (await bookSchema
			.findById(bookId)
			.populate(shelfPopulated)
			.populate(categoryPopulated)
			.select('-__v')) as Book;

		const borrow = (await borrowSchema.findById(borrowId)) as Borrow;
		const newReturns = await returnsSchema.create({
			...req.body,
			user: {
				_id: user.id,
			},
			book: {
				_id: book.id,
			},
			borrow: {
				_id: borrow.id,
			},
		});

		return res.status(201).json({
			message: 'New Category Created!',
			data: newReturns,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};
