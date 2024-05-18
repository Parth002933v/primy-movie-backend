import { NextFunction, Request, Response } from "express";
import { SendResponse } from "../utils/ApiResponse";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import AgeRatingModel from "../model/ageRating_model";
import CustomError from "../utils/ErrorObject";

export const handleGetAllAgeRatings = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const ageRatings = await AgeRatingModel.find();

    if (ageRatings.length == 0) {
      throw new CustomError({
        message: "There is No data Found",
        statusCode: 404,
      });
    }

    return SendResponse({
      res: res,
      length: ageRatings.length,
      message: "Data fetched successfully!",
      statusCode: 200,
      data: ageRatings,
    });
  }
);

interface hanldeCreateAgeRatingsParams {
  rating: string;
  defination: string;
}
export const hanldeCreateAgeRatings = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { rating, defination }: hanldeCreateAgeRatingsParams = req.body;

    if (!rating || !defination) {
      throw new CustomError({
        message: "You must have to provide rating and defination both",
        statusCode: 400,
      });
    }

    const createdAgeRating = await AgeRatingModel.create({
      rating: rating,
      defination: defination,
    });

    if (!createdAgeRating) {
      throw new CustomError({
        message: "Somthing went wrong!",
        statusCode: 500,
      });
    }

    return SendResponse({
      res: res,
      message: "new age rating create successfully!",
      statusCode: 201,
      data: createdAgeRating,
    });
  }
);
