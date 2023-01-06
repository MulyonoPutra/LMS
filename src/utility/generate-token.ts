import jwt from 'jsonwebtoken';
import { TypedResponse } from './typed-controller';
import { CookieType } from '../interface/cookie-type';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const generateAccessToken = (payload: object) => {
	return jwt.sign(payload, `${ACCESS_TOKEN_SECRET}`, { expiresIn: '15m' });
};

export const generateRefreshToken = (
	payload: object,
	res: TypedResponse<Partial<CookieType>>
) => {
	const refreshToken = jwt.sign(payload, `${REFRESH_TOKEN_SECRET}`, {
		expiresIn: '1d',
	});

	res.cookie('refresh-token', refreshToken, {
		httpOnly: true,
		path: `/api/v1/refresh-token`,
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
	});

	return refreshToken;
};
