import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import AppError from "../error/AppError";
import { env } from "../config/env";
import { ErrorSources } from "./interface";
import handleZodError from "./handleZod";
import { ZodError } from "zod";
import handlePrismaError from "./handlePrisma";

function globalErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorSources: ErrorSources[] | undefined = [];

  if (env.NODE_ENV === "development") {
    console.error("🔥 Global Error Handler:", err);
  }

  // Zod validation error
  if (err instanceof ZodError) {
    const result = handleZodError(err);
    statusCode = result.statusCode;
    message = result.message;
    errorSources = result.errorSources;
  }

  // Prisma known request errors (like duplicate key, constraint fails, etc.)
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const result = handlePrismaError(err);
    statusCode = result.statusCode;
    message = result.message;
    errorSources = result.errorSources;
  }

  // Prisma validation errors
  else if (err instanceof Prisma.PrismaClientValidationError) {
    message = "Invalid data provided to Prisma client.";
    statusCode = 400;
  }

  // Custom AppError
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Generic JS Error
  else if (err instanceof Error) {
    message = err.message;
    statusCode = 500;
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    errorSources,
    ...(env.NODE_ENV === "development" && {
      err,
      stack: err instanceof Error ? err.stack : {},
    }),
  });

  next();
}

export default globalErrorHandler;
