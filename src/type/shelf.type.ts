import { TypedResponse } from '../utility/typed-controller';
import { ResponseEntity, ResponseMessage } from '../interface/response-entity';
import { Shelf } from '../interface/shelf';

export type ShelfResponseType = TypedResponse<ResponseMessage | Partial<ResponseEntity<Shelf[]>>>;
export type FindOneShelfResponseType = TypedResponse<ResponseMessage | Partial<ResponseEntity<Shelf | null>>>;
export type RemoveShelfResponseType = TypedResponse<ResponseMessage | Partial<ResponseEntity<void>>>;
