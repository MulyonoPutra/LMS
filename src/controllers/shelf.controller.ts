import shelfSchema from '../models/shelf.schema';
import AppError from '../utility/app-error';
import { NextFunction, Request } from 'express';
import {
	FindOneShelfResponseType,
	RemoveShelfResponseType,
	ShelfResponseType,
} from '../type/shelf.type';
import { Shelf } from '../interface/shelf';

export const findAll = async (req: Request, res: ShelfResponseType, next: NextFunction) => {
	try {
		const data = (await shelfSchema
										.find({})
										.populate('book')
										.select('-__v')) as unknown as Shelf[];

		return res.status(200).json({
			message: 'Successfully retrieved!',
			data,
		});

	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const findById = async (req: Request, res: FindOneShelfResponseType, next: NextFunction) => {
	try {
		const { id } = req.params;
		const data = await shelfSchema.findOne({ _id: id });
		return res.status(200).json({
			message: 'Data successfully retrieved',
			data,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const remove = async (req: Request, res: RemoveShelfResponseType, next: NextFunction) => {
	try {
		const { id } = req.params;

		await shelfSchema.findByIdAndRemove(id);
		return res.status(200).json({
			message: 'Data successfully removed',
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const create = async (req: Request, res: FindOneShelfResponseType, next: NextFunction) => {
	try {
		const { shelfNumber, floor } = req.body;

		const newShelf = await shelfSchema.create({
			shelfNumber,
			floor,
		});

		return res.status(201).json({
			message: 'New Shelf Successfully Created!',
			data: newShelf,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};
