import { TypedResponse, TypedRequest } from '../utility/typed-controller';
import UserSchema from '../models/user.schema';
import bcrypt from 'bcrypt';
import { ResponseEntity } from '../interface/response-entity';
import { errorResponse } from '../utility/error-response';
import { IRegister } from '../interface/register';
import {
	generateAccessToken,
	generateRefreshToken,
} from '../utility/generate-token';
import { CookieType } from '../interface/cookie-type';
import { IUser } from '../interface/user';
import { avatarGenerator } from '../utility/avatar-generator';
import { LoginUserInput } from '../utility/login-validation';

export interface IUserResponse {
	username: string | undefined;
	account: string | undefined;
}

export interface ILoginResponse {
	accessToken: string;
	user: IUser | undefined;
}

export type RegisterResponseType =
	| { message: string }
	| Partial<ResponseEntity<IUserResponse>>;

export type LoginResponseType =
	| { message: string }
	| Partial<ResponseEntity<ILoginResponse>>
	| Partial<CookieType>;

export const register = (role?: string) => async (
	req: TypedRequest<Record<string, never>, IRegister>,
	res: TypedResponse<RegisterResponseType>,
) => {
	try {
		const { username, account, password } = req.body;
		const users = await UserSchema.findOne({ account });
		if (users) {
			return res.status(400).json({
				message: 'User already exists',
			});
		}

		const salt = await bcrypt.genSalt(Number(10));
		const hashPassword = await bcrypt.hash(password, salt);

		await new UserSchema({
			username,
			account,
			password: hashPassword,
			avatar: avatarGenerator(),
			role,
		}).save();

		const data = { username, account };

		return res.status(200).json({
			message: 'Success',
			data,
		});
	} catch (e) {
		return errorResponse(e, res);
	}
};

export const login = async (
	req: TypedRequest<Record<string, never>, LoginUserInput>,
	res: TypedResponse<LoginResponseType>
) => {
	try {
		const { account, password } = req.body;
		const user = await UserSchema.findOne({ account });
		if (!user) {
			return res.status(400).json({
				message: 'User not found!',
			});
		}

		await loginSuccessful(user, password, res);

	} catch (e) {
		return errorResponse(e, res);
	}
};

const loginSuccessful = async (
    user: IUser,
    password: string,
	res: TypedResponse<LoginResponseType>
) => {
	const isValid = await bcrypt.compare(password, user.password);

	// Check if password is valid
	if (!isValid) {
		return res.status(500).json({ message: 'Password is incorrect!' });
	}

	const accessToken = generateAccessToken({ id: user._id });
	const refreshToken = generateRefreshToken({ id: user._id }, res);

	await UserSchema.findOneAndUpdate(
		{ _id: user._id },
		{
			refreshToken: refreshToken,
		}
	);

	res.cookie('refresh-token', refreshToken, {
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000,
		// secure: true
	});

	return res.status(200).json({
		message: 'Success',
		data: { accessToken, user },
	});
}

// NOTE:
// - https://codevoweb.com/node-typescript-mongodb-jwt-authentication/
// - https://www.bezkoder.com/node-js-mongodb-auth-jwt/
