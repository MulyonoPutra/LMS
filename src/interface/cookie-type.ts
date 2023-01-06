import { CookieOptions } from 'express';

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
