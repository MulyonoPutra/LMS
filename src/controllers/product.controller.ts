import ProductSchema from '../models/product.schema';
import { Request } from 'express';
import { errorResponse } from '../utility/error-response';
import {
	FindOneProductResponseType,
	NewProductResponseType,
	ProductRequestType,
	ProductResponseType
} from '../type/product.type';

export const findAll = async (res: ProductResponseType) => {
	try {
		const data = await ProductSchema.find({});
		return res.status(200).json({
			message: 'Successfully retrieved!',
			data,
		});
	} catch (e) {
		errorResponse(e, res);
	}
};

export const create = async (
	req: ProductRequestType,
	res: NewProductResponseType
) => {
	try {
		const { name, price, quantity } = req.body;
		const newProduct = new ProductSchema({ name, price, quantity });
		return res.status(201).json({
			message: 'New Product Created!',
			data: newProduct,
		});
	} catch (e) {
		errorResponse(e, res);
	}
};

export const findById = async (req: Request, res: FindOneProductResponseType) => {
	try {
		const { id } = req.params;
		const data = await ProductSchema.findById(id);
		return res.status(200).json({
			message: 'Data successfully retrieved',
			data
		});
	} catch (e) {
		errorResponse(e, res);
	}
}