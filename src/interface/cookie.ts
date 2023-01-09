import { CookieOptions } from 'express';
import { IRefreshToken } from './token';

export interface CookieType {
	name?: string;
	value?: string | object;
	httpOnly?: boolean;
	secure?: boolean;
	path?: string;
	domain?: string;
	expires?: Date;
	options?: CookieOptions;
}

export interface ICookieRequest {
	cookies: IRefreshToken;
}
