import { Category } from './category';
import { Images } from './images';
import { Shelf } from './shelf';

export interface Book {
	id?: string;
	title: string;
	author: string;
	isbn: string;
	price: number;
	description: string;
	images: Images;
	publishDate: string;
	category: Category;
	shelf: Shelf;
}
