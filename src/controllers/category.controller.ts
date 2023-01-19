import { NextFunction, Request } from 'express';
import categorySchema from '../models/category.schema';
import AppError from '../utility/app-error';
import {
	CategoryRequestType,
	CategoryResponseType,
	FindOneCategoryResponseType,
	RemoveCategoryResponseType,
} from '../type/category.type';

export const findAll = async (
	req: Request,
	res: CategoryResponseType,
	next: NextFunction
) => {
	try {
		const data = await categorySchema.find({}).select('-__v');
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
	res: FindOneCategoryResponseType,
	next: NextFunction
) => {
	try {
		const { id } = req.params;
		const data = await categorySchema.findOne({ _id: id }).select('-__v');
		return res.status(200).json({
			message: 'Data successfully retrieved',
			data,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const create = async (
	req: CategoryRequestType,
	res: FindOneCategoryResponseType,
	next: NextFunction
) => {
	try {
		const { name, description } = req.body;
		const newCategory = await categorySchema.create({
			name,
			description,
		});
		return res.status(201).json({
			message: 'New Category Created!',
			data: newCategory,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const remove = async (
	req: Request,
	res: RemoveCategoryResponseType,
	next: NextFunction
) => {
	try {
		const { id } = req.params;

		await categorySchema.findByIdAndRemove(id);
		return res.status(200).json({
			message: 'Data successfully removed',
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const update = async (
	req: Request,
	res: FindOneCategoryResponseType,
	next: NextFunction
) => {
	try {
		const { id } = req.params;
		const { name, description } = req.body;
		await categorySchema.findByIdAndUpdate(id, {
			name,
			description,
		});
		return res.status(200).json({
			message: 'Data successfully updated',
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};
