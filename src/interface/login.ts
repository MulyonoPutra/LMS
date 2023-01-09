import { IUser } from './user';

export interface ILogin {
	account: string;
	password: string;
}

export interface ILoginResponse {
	user: IUser | undefined;
	accessToken: string;
}
