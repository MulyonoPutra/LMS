import { Schema, model } from 'mongoose';
import { Returns } from '../interface/returns';

const returnsSchema = new Schema<Returns>({
	borrow: {
		type: Schema.Types.ObjectId,
		ref: 'Borrow',
		required: true,
	},
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
	dateReturned: {
		type: String,
		required: false,
	},
	dueDate: {
		type: String,
		required: false,
	},
});

export default model<Returns>('Returns', returnsSchema);
