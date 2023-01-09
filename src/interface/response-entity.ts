export interface ResponseEntity<T> {
	status: number;
	message: string;
	data?: T;
}

export interface ResponseMessage {
	message: string;
}
