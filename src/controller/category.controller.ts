import { NextFunction, Request, Response } from "express";
import { SendResponse } from "../utils/ApiResponse";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import CustomError from "../utils/ErrorObject";
import CategoryModel from "../model/category_model";

export const handleGetAllCategorys = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categorys = await CategoryModel.find();

    if (categorys.length == 0) {
      throw new CustomError({
        message: "There is No data Found",
        statusCode: 404,
      });
    }

    return SendResponse({
      res: res,
      length: categorys.length,
      message: "Data fetched successfully!",
      statusCode: 200,
      data: categorys,
    });
  }
);
