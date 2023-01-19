import { IUser } from './user';
import { Book } from './book';

export interface Borrow {
	id?: string;
	user: IUser;
	book: Book;
	dateBorrowed: string;
	dueDate: string;
}
