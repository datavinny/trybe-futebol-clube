import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const { name, message, details, statusCode } = err as any;
  switch (name) {
    case 'CustomError':
      res.status(statusCode).json({ message }); break;
    case 'ValidationError':
      res.status(StatusCodes.BAD_REQUEST).json({ message: details[0].message });
      break;
    case 'NotFoundError':
      res.status(StatusCodes.NOT_FOUND).json({ message });
      break;
    case 'ConflictError':
      res.status(StatusCodes.CONFLICT).json({ message });
      break;
    default:
      console.error(err);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
  next();
};

export default errorMiddleware;
