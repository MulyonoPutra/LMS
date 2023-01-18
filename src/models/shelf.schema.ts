import { Schema, model } from 'mongoose';
import { Shelf } from '../interface/shelf';

const shelfSchema = new Schema<Shelf>({
	shelfNumber: {
		type: Number,
		required: true,
	},
	floor: {
		type: Number,
		required: true,
	},
	book: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Book',
			required: false,
		},
	],
});

export default model<Shelf>('Shelf', shelfSchema);
