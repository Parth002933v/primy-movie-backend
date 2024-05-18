import LanguageModel from "../model/languages_model";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/ErrorObject";
import { SendResponse } from "../utils/ApiResponse";
import VideoQualityModel from "../model/videoQuality_model";

export const handleGetAllVideoQuality = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const videoQualitys = await VideoQualityModel.find();

    if (videoQualitys.length == 0) {
      throw new CustomError({
        message: "There is No data Found",
        statusCode: 404,
      });
    }

    return SendResponse({
      res: res,
      length: videoQualitys.length,
      message: "Data fetched successfully!",
      statusCode: 200,
      data: videoQualitys,
    });
  }
);

interface hanldeCreateVideoQualityParams {
  quality: string;
  nickname: string;
}
export const hanldeCreateVideoQuality = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { quality, nickname }: hanldeCreateVideoQualityParams = req.body;

    if (!quality || !nickname) {
      throw new CustomError({
        message: "You must have to provide quality and nickname both",
        statusCode: 400,
      });
    }

    const createdAgeRating = await VideoQualityModel.create({
      Quality: quality,
      Nickname: nickname,
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
