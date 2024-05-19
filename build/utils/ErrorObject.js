"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMongoDBError = void 0;
class CustomError extends Error {
    constructor({ message, statusCode }) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = CustomError;
// Function to check if an error is a MongoDB error
function isMongoDBError(error) {
    return typeof error.code === "number" || error.name === "CastError";
}
exports.isMongoDBError = isMongoDBError;
