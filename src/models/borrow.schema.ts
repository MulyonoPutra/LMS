import { Schema, model } from 'mongoose';
import { Borrow } from '../interface/borrow';

const borrowSchema = new Schema<Borrow>({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	book: {
		type: Schema.Types.ObjectId,
		ref: 'Book',
		required: true,
	},
	dateBorrowed: {
		type: String,
		required: false,
	},
	dueDate: {
		type: String,
		required: false,
	},
});

export default model<Borrow>('Borrow', borrowSchema);
