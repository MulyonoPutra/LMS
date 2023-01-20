import { TypedResponse } from '../utility/typed-controller';
import { ResponseEntity, ResponseMessage } from '../interface/response-entity';
import { Returns } from '../interface/returns';

export type ReturnsResponseType = TypedResponse<ResponseMessage | Partial<ResponseEntity<Returns[]>>>;
export type ReturnsFindOneResponseType = TypedResponse<ResponseMessage | Partial<ResponseEntity<Returns | null>>>;
