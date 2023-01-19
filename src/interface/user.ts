import { Document } from 'mongoose';
import { Images } from './images';
import { Request } from 'express';

export interface IUser extends Document {
	id?: string;
	username: string;
	account: string;
	password: string;
	role: string;
	refreshToken: string;
	phone: number;
	dob: string;
	description: string;
	avatar: string;
	images: Images;
	_doc: object;
}

export interface IUserDetails extends IUser {
	_id: string;
}

export interface UserRequest extends Request {
	user?: IUser;
}
