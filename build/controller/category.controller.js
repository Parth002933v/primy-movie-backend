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
exports.handleGetAllCategorys = void 0;
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncErrorHandler_1 = require("../utils/asyncErrorHandler");
const ErrorObject_1 = __importDefault(require("../utils/ErrorObject"));
const category_model_1 = __importDefault(require("../model/category_model"));
exports.handleGetAllCategorys = (0, asyncErrorHandler_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const categorys = yield category_model_1.default.find();
    if (categorys.length == 0) {
        throw new ErrorObject_1.default({
            message: "There is No data Found",
            statusCode: 404,
        });
    }
    return (0, ApiResponse_1.SendResponse)({
        res: res,
        length: categorys.length,
        message: "Data fetched successfully!",
        statusCode: 200,
        data: categorys,
    });
}));
