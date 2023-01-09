export interface IRegister {
	username: string;
	account: string;
	password: string;
}

export interface IRegisterResponse {
	username: string | undefined;
	account: string | undefined;
}
