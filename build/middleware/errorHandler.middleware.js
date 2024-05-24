"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const ErrorObject_1 = __importStar(require("../utils/ErrorObject"));
const devError = ({ res, error }) => {
    res.status(error.statusCode).json({
        status: error.statusCode,
        messgae: error.message,
        stackTrace: error.stack,
        error: error,
    });
};
const prodError = ({ res, error }) => {
    if (error.isOperational) {
        res.status(error.statusCode).json({
            statusCode: error.statusCode,
            message: error.message,
        });
    }
    else {
        res.status(error.statusCode).json({
            statusCode: 500,
            message: "Something went wrong",
        });
    }
};
const duplicateKeyErrorHandler = (error) => {
    const value = Object.values(error.keyValue);
    const key = Object.keys(error.keyValue);
    return new ErrorObject_1.default({
        message: `There is already a movie with ${key} : "${value}". Please use another ${key}!`,
        statusCode: 409,
    });
};
const typeCastErrorHandler = (error) => {
    return new ErrorObject_1.default({
        message: `the Id of the ${error.value} is invalid`,
        statusCode: 400,
    });
};
const globalErrorHandler = (error, _req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    if (process.env.NODE_ENV == "development") {
        devError({ res: res, error: error });
    }
    else if (process.env.NODE_ENV == "production") {
        if ((0, ErrorObject_1.isMongoDBError)(error) && error.code === 11000) {
            error = duplicateKeyErrorHandler(error);
        }
        if ((0, ErrorObject_1.isMongoDBError)(error) && error.name === "CastError") {
            error = typeCastErrorHandler(error);
        }
        prodError({ res: res, error: error });
    }
};
exports.globalErrorHandler = globalErrorHandler;
