import { Book } from './book';

export interface Shelf {
	id?: string;
	shelfNumber: number;
	floor: number;
	book: Book[];
}
