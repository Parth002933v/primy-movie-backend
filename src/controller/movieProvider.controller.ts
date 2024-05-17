import { Request, Response, NextFunction } from "express";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import { SendResponse } from "../utils/ApiResponse";
import MovieProviderModel from "../model/movieProvider";
import CustomError from "../utils/ErrorObject";

export const handleGetMovieProvider = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    return SendResponse({
      res: res,
      length: 0,
      message: "Data fetched successfully!",
      statusCode: 200,
    });
  }
);

interface handleCreateMovieProviderParams {
  providerName: string;
}
export const handleCreateMovieProvider = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { providerName } = req.body;

    if (!providerName) {
      throw new CustomError({
        message: "providerName is not provided",
        statusCode: 400,
      });
    }

    if (!req.file) {
      throw new CustomError({
        message: "no image uploaded",
        statusCode: 400,
      });
    }

    const filename = req.file.path;

    const imageURL = `${req.protocol}://${req.get("host")}/movie-provider/${
      req.file.filename
    }`;

    console.log(imageURL);

    const newMovieProvider = await MovieProviderModel.create({
      providerName: providerName,
      image: imageURL,
    });

    if (!newMovieProvider) {
      throw new CustomError({
        message: "Inernal Server Error",
        statusCode: 500,
      });
    }

    return SendResponse({
      res: res,
      message: " data uploaded successfully!",
      statusCode: 200,
      data: imageURL,
    });
  }
);
