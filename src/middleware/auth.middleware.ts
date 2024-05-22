import { Request, NextFunction, Response } from "express";

import jwt from "jsonwebtoken";
import { AdminModel, IAdmin } from "../model/admin_model";
import CustomError from "../utils/ErrorObject";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";

// Define the interface for authenticated requests
interface AuthenticatedRequest extends Request {
  admin?: IAdmin; // Update this with the actual type of your user object
}

// Middleware function for authentication
const verifyJWT = asyncErrorHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token: string =
      req.cookies.accessToken ||
      (req.headers.authorization &&
        req.headers.authorization.replace("Bearer ", ""));

    if (token === undefined) {
      throw new CustomError({
        statusCode: 401,
        message: "Unauthorized request",
      });
    }

    const decodedToken = jwt.verify(
      token!,
      process.env.ACCESS_TOKEN_SECRET!
    ) as { _id: string };

    const user = await AdminModel.findById(decodedToken._id).select(
      "-password -refreshToken -__v"
    );

    if (!user) {
      throw new CustomError({
        statusCode: 401,
        message: "Invalid Access Token",
      });
    }

    req.admin = user!;

    next();
  }
);

export { verifyJWT, AuthenticatedRequest };
