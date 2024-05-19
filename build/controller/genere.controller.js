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
exports.getAllGeneres = exports.handleCreateGenere = void 0;
const genre_model_1 = __importDefault(require("../model/genre_model"));
const asyncErrorHandler_1 = require("../utils/asyncErrorHandler");
const ErrorObject_1 = __importDefault(require("../utils/ErrorObject"));
const ErrorObject_2 = __importDefault(require("../utils/ErrorObject"));
const ApiResponse_1 = require("../utils/ApiResponse");
exports.handleCreateGenere = (0, asyncErrorHandler_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { genere } = req.body;
    if (!genere) {
        throw new ErrorObject_2.default({ message: "genere is required", statusCode: 400 });
    }
    const newGenere = yield genre_model_1.default.create({
        name: genere,
    });
    if (!newGenere) {
        throw new ErrorObject_2.default({
            message: "somthing went wrong",
            statusCode: 500,
        });
    }
    return (0, ApiResponse_1.SendResponse)({
        res: res,
        statusCode: 201,
        message: "New Genere Created!",
        data: newGenere,
    });
}));
exports.getAllGeneres = (0, asyncErrorHandler_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allGenere = yield genre_model_1.default.find();
    if (allGenere.length == 0)
        throw new ErrorObject_1.default({
            message: "there no genere found in database",
            statusCode: 404,
        });
    return (0, ApiResponse_1.SendResponse)({
        res: res,
        length: allGenere.length,
        message: "Data fetched successfully!",
        statusCode: 200,
        data: allGenere,
    });
}));
