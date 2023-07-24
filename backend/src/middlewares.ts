/**
@Author: Hrishi Patel <hrishi.patel@dal.ca>
*/
import { Request, Response, NextFunction } from "express";

function notFound(req: Request, res: Response, next: NextFunction): void {
  res.status(404);
  const error = new Error(`Got lost? - ${req.originalUrl}`);
  next(error);
}

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack:
      process.env.NODE_ENV === "production"
        ? "Uh oh! Something went wrong"
        : err.stack,
  });
}

export { notFound, errorHandler };
