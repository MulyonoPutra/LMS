import { Schema, model } from 'mongoose';
import { Product } from '../interface/product';

const productSchema = new Schema<Product>(
	{
		name: {
			type: String,
			required: [true, 'Please add your Product Name'],
			trim: true,
			maxLength: [20, 'Your name is up to 20 chars long.'],
		},
		price: {
			type: Number,
			required: [true, 'Please add your product price'],
			trim: true,
			unique: true,
		},
		quantity: {
			type: Number,
			required: [true, 'Please add your product quantity'],
		},
	},
	{ timestamps: true }
);

export default model<Product>('Product', productSchema);
