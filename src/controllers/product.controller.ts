import { NextFunction, Request } from 'express';

import ProductSchema from '../models/product.schema';
import {
    FindOneProductResponseType, NewProductResponseType, ProductRequestType, ProductResponseType
} from '../type/product.type';
import AppError from '../utility/app-error';

const hideAttributes = {
	__v: 0,
	createdAt: 0,
	updatedAt: 0,
};

export const findAll = async (req: Request, res: ProductResponseType, next: NextFunction) => {
	try {
		const data = await ProductSchema.find({}, hideAttributes);
		return res.status(200).json({
			message: 'Successfully retrieved!',
			data,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const create = async (req: ProductRequestType, res: NewProductResponseType, next: NextFunction) => {
	try {
		const { name, price, quantity } = req.body;
		const newProduct = new ProductSchema({ name, price, quantity });

		await newProduct.save();

		return res.status(201).json({
			message: 'New Product Created!',
			data: newProduct,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const findById = async (req: Request, res: FindOneProductResponseType, next: NextFunction) => {
	try {
		const { id } = req.params;
		const data = await ProductSchema.findOne({ _id: id }, hideAttributes);
		return res.status(200).json({
			message: 'Data successfully retrieved',
			data,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};
