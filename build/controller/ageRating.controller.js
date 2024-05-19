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
exports.hanldeCreateAgeRatings = exports.handleGetAllAgeRatings = void 0;
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncErrorHandler_1 = require("../utils/asyncErrorHandler");
const ageRating_model_1 = __importDefault(require("../model/ageRating_model"));
const ErrorObject_1 = __importDefault(require("../utils/ErrorObject"));
exports.handleGetAllAgeRatings = (0, asyncErrorHandler_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ageRatings = yield ageRating_model_1.default.find();
    if (ageRatings.length == 0) {
        throw new ErrorObject_1.default({
            message: "There is No data Found",
            statusCode: 404,
        });
    }
    return (0, ApiResponse_1.SendResponse)({
        res: res,
        length: ageRatings.length,
        message: "Data fetched successfully!",
        statusCode: 200,
        data: ageRatings,
    });
}));
exports.hanldeCreateAgeRatings = (0, asyncErrorHandler_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating, defination } = req.body;
    if (!rating || !defination) {
        throw new ErrorObject_1.default({
            message: "You must have to provide rating and defination both",
            statusCode: 400,
        });
    }
    const createdAgeRating = yield ageRating_model_1.default.create({
        rating: rating,
        defination: defination,
    });
    if (!createdAgeRating) {
        throw new ErrorObject_1.default({
            message: "Somthing went wrong!",
            statusCode: 500,
        });
    }
    return (0, ApiResponse_1.SendResponse)({
        res: res,
        message: "new age rating create successfully!",
        statusCode: 201,
        data: createdAgeRating,
    });
}));
