import LanguageModel from "../model/languages_model";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/ErrorObject";
import { SendResponse } from "../utils/ApiResponse";
 
export const handleGetAllLanguages = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const Languages = await LanguageModel.find();

    if (Languages.length == 0) {
      throw new CustomError({
        message: "There is No data Found",
        statusCode: 404,
      });
    }

    return SendResponse({
      res: res,
      length: Languages.length,
      message: "Data fetched successfully!",
      statusCode: 200,
      data: Languages,
    });
  }
);
