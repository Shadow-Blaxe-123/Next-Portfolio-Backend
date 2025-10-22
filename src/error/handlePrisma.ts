import { Prisma } from "@prisma/client";
import { ErrorSources, HandlerResponse } from "./interface";

export const handlePrismaError = (
  err: Prisma.PrismaClientKnownRequestError
): HandlerResponse => {
  let message = "Database error occurred.";
  let statusCode = 500;
  const errorSources: ErrorSources[] = [];

  switch (err.code) {
    case "P2002":
      message = "Unique constraint failed on one or more fields.";
      errorSources.push({
        path: (err.meta?.target as string[])?.join(", ") || "unknown",
        message,
      });
      statusCode = 400;
      break;

    case "P2003":
      message = "Foreign key constraint failed.";
      statusCode = 400;
      break;

    case "P2025":
      message = "Record not found.";
      statusCode = 404;
      break;

    default:
      message = err.message || "Database error occurred.";
      statusCode = 500;
  }

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handlePrismaError;
