import { Borrow } from './borrow';
import { IUser } from './user';
import { Book } from './book';

export interface Returns {
	borrow: Borrow;
	user: IUser;
	book: Book;
	dateReturned: string;
	dueDate: string;
}
