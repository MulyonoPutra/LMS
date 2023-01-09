import { TypedRequest, TypedResponse } from '../utility/typed-controller';
import { IRegister, IRegisterResponse } from '../interface/register';
import { ResponseEntity, ResponseMessage } from '../interface/response-entity';
import { LoginUserInput } from '../utility/login-validation';
import { ILoginResponse } from '../interface/login';
import { CookieType, ICookieRequest } from '../interface/cookie';
import { INewAccessToken } from '../interface/token';

export type RegisterRequestType = TypedRequest<
	Record<string, never>,
	IRegister
>;
export type RegisterResponseType = TypedResponse<
	ResponseMessage | Partial<ResponseEntity<IRegisterResponse>>
>;
export type LoginRequestType = TypedRequest<
	Record<string, never>,
	LoginUserInput
>;
export type LoginResponseType = TypedResponse<
	| ResponseMessage
	| Partial<ResponseEntity<ILoginResponse>>
	| Partial<CookieType>
>;
export type NewAccessTokenResponseType = TypedResponse<
	ResponseMessage | INewAccessToken
>;
export type RefreshTokenRequestType = TypedRequest<
	Record<string, never>,
	ICookieRequest
>;
export type RefreshTokenResponseType = TypedResponse<
	ResponseMessage | INewAccessToken
>;
export type LogoutRequestType = TypedRequest<
	Record<string, never>,
	ICookieRequest
>;
