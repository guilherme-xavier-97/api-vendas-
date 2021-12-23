/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import { error } from 'console';
import '@shared/typeorm';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';
/*This library allow to us separate the files in different pages. Like 5, 10, 15 register per page and
then you click "next" to change the page or "previous" to go back */
import { pagination } from 'typeorm-pagination';
import rateLimiter from '@shared/http/middleware/rateLimiter';

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use(pagination);
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log(error);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(process.env.PORT || 3333, () => {
  console.log('Server started on port 3333! 🏆');
});
