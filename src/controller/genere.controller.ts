import { Request, Response, NextFunction, RequestHandler } from "express";
import GenreModel from "../model/genre_model";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import customError from "../utils/ErrorObject";
import CustomError from "../utils/ErrorObject";
import { SendResponse } from "../utils/ApiResponse";

interface handleCreateGenereParama {
  genere: string;
}
export const handleCreateGenere = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { genere }: handleCreateGenereParama = req.body;

    if (!genere) {
      throw new CustomError({ message: "genere is required", statusCode: 400 });
    }

    const newGenere = await GenreModel.create({
      name: genere,
    });

    if (!newGenere) {
      throw new CustomError({
        message: "somthing went wrong",
        statusCode: 500,
      });
    }

    return SendResponse({
      res: res,
      statusCode: 201,
      message: "New Genere Created!",
      data: newGenere,
    });
  }
);

export const getAllGeneres = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allGenere = await GenreModel.find();

    if (allGenere.length == 0)
      throw new customError({
        message: "there no genere found in database",
        statusCode: 404,
      });

    return SendResponse({
      res: res,
      length: allGenere.length,
      message: "Data fetched successfully!",
      statusCode: 200,
      data: allGenere,
    });
  }
);
