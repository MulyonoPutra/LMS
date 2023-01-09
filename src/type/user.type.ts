import { TypedResponse } from '../utility/typed-controller';
import { ResponseEntity, ResponseMessage } from '../interface/response-entity';
import { IUserDetails } from '../interface/user';

export type UserResponseType = TypedResponse<
	ResponseMessage | Partial<ResponseEntity<IUserDetails[]>>
>;
