import { Images } from './images';

export interface Product {
	id?: string;
	name: string;
	price: number;
	quantity: number;
	images: Images;
}
