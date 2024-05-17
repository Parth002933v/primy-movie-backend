// Define an interface for the ApiResponse parameters
interface ApiResponseParams {
  statusCode: number;
  message: string;
  data?: any;
}

// Define the ApiResponse class
class ApiResponse {
  statusCode: number;
  message: string;
  data?: any;

  constructor({ statusCode, message, data }: ApiResponseParams) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

import { Request, Response, NextFunction } from "express";

interface SendResponseParams {
  res: Response;
  statusCode: number;
  length?: number;
  message: string;
  data?: any;
}
export const SendResponse = ({
  res,
  statusCode,
  length,
  message,
  data,
}: SendResponseParams) => {
  res.status(statusCode).json({
    statusCode: statusCode,
    length: length,
    message: message,
    data: data,
  });
};

// export { ApiResponse };
