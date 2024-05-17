import { Request, Response, NextFunction } from "express";
import CustomError, {
  isMongoDBError,
  MongoDBError,
} from "../utils/ErrorObject";

const devError = ({ res, error }: { res: Response; error: CustomError }) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    messgae: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const prodError = ({ res, error }: { res: Response; error: CustomError }) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      messgae: error.message,
    });
  } else {
    res.status(error.statusCode).json({
      statusCode: 500,
      messgae: "Something went wrong",
    });
  }
};

const duplicateKeyErrorHandler = (error: CustomError & MongoDBError) => {
  return new CustomError({
    message: `There is already a movie with name "${
      error.keyValue!.name
    }". Please use another name!`,
    statusCode: 409,
  });
};

export const globalErrorHandler = (
  error: CustomError,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV == "development") {
    devError({ res: res, error: error });
  } else if (process.env.NODE_ENV == "production") {
    if (isMongoDBError(error) && error.code === 11000) {
      error = duplicateKeyErrorHandler(error);
    }
    prodError({ res: res, error: error });
  }
};
