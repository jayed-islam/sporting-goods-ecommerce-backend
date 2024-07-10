import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import router from './app/routes';
// import dotenv from 'dotenv';
// import httpStatus from 'http-status';
const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

const getAController = (_req: Request, res: Response) => {
  res.json('App is running');
};

app.get('/', getAController);

// not Found
app.use(notFound);

// global error handler
app.use(globalErrorHandler);

export default app;
