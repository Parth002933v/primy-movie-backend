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
exports.handleCreateMovieProvider = exports.handleGetMovieProvider = void 0;
const asyncErrorHandler_1 = require("../utils/asyncErrorHandler");
const ApiResponse_1 = require("../utils/ApiResponse");
const movieProvider_1 = __importDefault(require("../model/movieProvider"));
const ErrorObject_1 = __importDefault(require("../utils/ErrorObject"));
exports.handleGetMovieProvider = (0, asyncErrorHandler_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const movieProviders = yield movieProvider_1.default.find();
    if (movieProviders.length == 0) {
        throw new ErrorObject_1.default({
            message: "There Is No Movie Provider awailable",
            statusCode: 404,
        });
    }
    return (0, ApiResponse_1.SendResponse)({
        res: res,
        length: movieProviders.length,
        message: "Data fetched successfully!",
        statusCode: 200,
        data: movieProviders,
    });
}));
exports.handleCreateMovieProvider = (0, asyncErrorHandler_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { providerName } = req.body;
    if (!providerName) {
        throw new ErrorObject_1.default({
            message: "providerName is not provided",
            statusCode: 400,
        });
    }
    if (!req.file) {
        throw new ErrorObject_1.default({
            message: "no image uploaded",
            statusCode: 400,
        });
    }
    const imageURL = `${req.file.destination.replace("./public", "")}${req.file.filename}`;
    const newMovieProvider = yield movieProvider_1.default.create({
        providerName: providerName,
        image: imageURL,
    });
    if (!newMovieProvider) {
        throw new ErrorObject_1.default({
            message: "Inernal Server Error",
            statusCode: 500,
        });
    }
    return (0, ApiResponse_1.SendResponse)({
        res: res,
        message: " data uploaded successfully!",
        statusCode: 200,
        data: newMovieProvider,
    });
}));
