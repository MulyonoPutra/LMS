import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import cookieParser from 'cookie-parser';
import { DBConnection } from './config/db-connection';

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT ?? '3000';

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(routes);
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
	DBConnection();
});
