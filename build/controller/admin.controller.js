"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInAdmin = exports.signUpAdmin = void 0;
const ErrorObject_1 = __importDefault(require("../utils/ErrorObject"));
const admin_model_1 = require("../model/admin_model");
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncErrorHandler_1 = require("../utils/asyncErrorHandler");
exports.signUpAdmin = (0, asyncErrorHandler_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("signUpAdmin");
    const { email, password } = req.body;
    // Check for missing email or password
    if (!email || !password) {
        throw new ErrorObject_1.default({
            statusCode: 400,
            message: "email and password are required",
        });
    }
    // Check for existing user
    const existingUser = yield admin_model_1.AdminModel.findOne({ email: email });
    if (existingUser) {
        throw new ErrorObject_1.default({
            statusCode: 409,
            message: "there can be only one admin",
        });
    }
    // Create new user
    const newUser = yield admin_model_1.AdminModel.create({
        email: email,
        password: password,
    });
    const userCreated = yield admin_model_1.AdminModel.findById(newUser._id);
    // Send success response
    return (0, ApiResponse_1.SendResponse)({
        res: res,
        statusCode: 200,
        data: userCreated,
        message: "User registered successfully",
    });
}));
function GenerateAccessAndRefreshToken(adminID) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield admin_model_1.AdminModel.findById(adminID);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.GenerateRefreshToken();
        user.refreshToken = refreshToken;
        yield user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    });
}
exports.signInAdmin = (0, asyncErrorHandler_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    // Check for missing  password
    if (!password) {
        throw new ErrorObject_1.default({
            statusCode: 400,
            message: "password is required",
        });
    }
    // Check for existing user
    const userExist = yield admin_model_1.AdminModel.findOne({ _id: process.env.ADMIN_ID });
    if (!userExist) {
        throw new ErrorObject_1.default({
            statusCode: 404,
            message: "No admin found. Please register first",
        });
    }
    const isPasswordValid = yield userExist.isPasswordCorrect(password);
    if (isPasswordValid == false) {
        throw new ErrorObject_1.default({
            statusCode: 401,
            message: "Invalid user credentials",
        });
    }
    const { accessToken, refreshToken } = yield GenerateAccessAndRefreshToken(userExist._id);
    const loggedInUser = yield admin_model_1.AdminModel.findById(userExist._id);
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
}));
