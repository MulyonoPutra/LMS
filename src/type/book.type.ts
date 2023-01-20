import { TypedRequest, TypedResponse } from '../utility/typed-controller';
import { ResponseEntity, ResponseMessage } from '../interface/response-entity';
import { Book } from '../interface/book';

export type BookResponseType = TypedResponse<ResponseMessage | Partial<ResponseEntity<Book[]>>>;
export type FindOneBookResponseType = TypedResponse<ResponseMessage | Partial<ResponseEntity<Book | null>>>;
export type BookRequestType = TypedRequest<Record<string, never>, Book>;
export type RemoveBookResponseType = TypedResponse<ResponseMessage | Partial<ResponseEntity<void>>>;
