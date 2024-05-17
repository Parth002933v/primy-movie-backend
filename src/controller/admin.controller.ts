import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/ErrorObject";
import { AdminModel } from "../model/admin_model";
import { SendResponse } from "../utils/ApiResponse";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";

interface SignupRequestBody {
  email: string;
  password: string;
}
export const signUpAdmin = asyncErrorHandler(
  async (req: Request, res: Response) => {
    console.log("signUpAdmin");

    const { email, password }: SignupRequestBody = req.body;

    // Check for missing email or password
    if (!email || !password) {
      throw new CustomError({
        statusCode: 400,
        message: "email and password are required",
      });
    }

    // Check for existing user
    const existingUser = await AdminModel.findOne({ email: email });

    if (existingUser) {
      throw new CustomError({
        statusCode: 409,
        message: "there can be only one admin",
      });
    }

    // Create new user
    const newUser = await AdminModel.create({
      email: email,
      password: password,
    });

    const userCreated = await AdminModel.findById(newUser._id);

    // Send success response
    return SendResponse({
      res: res,
      statusCode: 200,
      data: userCreated,
      message: "User registered successfully",
    });
  }
);

async function GenerateAccessAndRefreshToken(adminID: string) {
  const user = await AdminModel.findById(adminID);

  const accessToken = user!.generateAccessToken();
  const refreshToken = user!.GenerateRefreshToken();

  user!.refreshToken = refreshToken;
  await user!.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
}

interface SignInRequestBody {
  password: string;
}
export const signInAdmin = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { password }: SignInRequestBody = req.body;

    // Check for missing  password
    if (!password) {
      throw new CustomError({
        statusCode: 400,
        message: "password is required",
      });
    }

    // Check for existing user
    const userExist = await AdminModel.findOne({ _id: process.env.ADMIN_ID });

    if (!userExist) {
      throw new CustomError({
        statusCode: 404,
        message: "No admin found. Please register first",
      });
    }

    const isPasswordValid = await userExist.isPasswordCorrect(password);

    if (isPasswordValid == false) {
      throw new CustomError({
        statusCode: 401,
        message: "Invalid user credentials",
      });
    }

    const { accessToken, refreshToken } = await GenerateAccessAndRefreshToken(
      userExist._id
    );

    const loggedInUser = await AdminModel.findById(userExist._id);

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        statusCode: 200,
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: loggedInUser,
        },
        message: "You are logged in successfully!",
      });
  }
);
