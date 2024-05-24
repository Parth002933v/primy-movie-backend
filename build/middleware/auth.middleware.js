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
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_model_1 = require("../model/admin_model");
const ErrorObject_1 = __importDefault(require("../utils/ErrorObject"));
const asyncErrorHandler_1 = require("../utils/asyncErrorHandler");
// Middleware function for authentication
const verifyJWT = (0, asyncErrorHandler_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.accessToken ||
        (req.headers.authorization &&
            req.headers.authorization.replace("Bearer ", ""));
    if (token === undefined) {
        throw new ErrorObject_1.default({
            statusCode: 401,
            message: "Unauthorized request",
        });
    }
    const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = yield admin_model_1.AdminModel.findById(decodedToken._id).select("-password -refreshToken -__v");
    if (!user) {
        throw new ErrorObject_1.default({
            statusCode: 401,
            message: "Invalid Access Token",
        });
    }
    req.admin = user;
    next();
}));
exports.verifyJWT = verifyJWT;
