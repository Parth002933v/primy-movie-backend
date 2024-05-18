interface CustomErrorParams {
  message: string;
  statusCode: number;
}

export default class CustomError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor({ message, statusCode }: CustomErrorParams) {
    super(message);

    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Define a MongoDBError interface
export interface MongoDBError extends Error {
  code: number;
  value: string;
  keyPattern?: Record<string, any>;
  keyValue?: Record<string, any>;
}

// Function to check if an error is a MongoDB error
export function isMongoDBError(error: any): error is MongoDBError {
  return typeof error.code === "number" || error.name === "CastError";
}
