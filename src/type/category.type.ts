import { TypedRequest, TypedResponse } from '../utility/typed-controller';
import { ResponseEntity, ResponseMessage } from '../interface/response-entity';
import { Category } from '../interface/category';

export type CategoryResponseType = TypedResponse<ResponseMessage | Partial<ResponseEntity<Category[]>>>;
export type FindOneCategoryResponseType = TypedResponse<ResponseMessage | Partial<ResponseEntity<Category | null>>>;
export type CategoryRequestType = TypedRequest<Record<string, never>, Category>;
export type RemoveCategoryResponseType = TypedResponse<ResponseMessage | Partial<ResponseEntity<void>>>;
