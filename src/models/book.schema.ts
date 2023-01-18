import { Schema, model } from 'mongoose';
import { Book } from '../interface/book';

const bookSchema = new Schema<Book>({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	isbn: {
		type: String,
		required: false,
	},
	description: {
		type: String,
		required: false,
	},
	images: {
		public_id: {
			type: String,
			required: false,
		},
		filename: {
			type: String,
			required: false,
		},
		secure_url: {
			type: String,
			required: false,
		},
		format: {
			type: String,
			required: false,
		},
		sizeInBytes: {
			type: String,
			required: false,
		},
	},
	publishDate: {
		type: String,
		required: false,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
	shelf: {
		type: Schema.Types.ObjectId,
		ref: 'Shelf',
		required: true,
	},
});

export default model<Book>('Book', bookSchema);
