import express, { Request, Response } from 'express';

const appErrorHandler = express();

appErrorHandler.use((err: any, req: Request, res: Response) => {
	err.status = err.status || 'error';
	err.statusCode = err.statusCode || 500;

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
});

export default appErrorHandler;