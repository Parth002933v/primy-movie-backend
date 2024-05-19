"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendResponse = void 0;
// Define the ApiResponse class
class ApiResponse {
    constructor({ statusCode, message, data }) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}
const SendResponse = ({ res, statusCode, length, TotalPages, message, data, }) => {
    res.status(statusCode).json({
        statusCode: statusCode,
        length: length,
        TotalPages: TotalPages,
        message: message,
        data: data,
    });
};
exports.SendResponse = SendResponse;
// export { ApiResponse };
