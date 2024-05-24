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
exports.handleUpdateMovie = exports.handleCerateMovie = exports.validateMovieModdelware = exports.handleGetMovieBySlugUrl = exports.handleGetLiteMovies = exports.handleGetMovies = void 0;
const express_validator_1 = require("express-validator");
const movie_model_1 = __importDefault(require("../model/movie_model"));
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncErrorHandler_1 = require("../utils/asyncErrorHandler");
const ErrorObject_1 = __importDefault(require("../utils/ErrorObject"));
const category_model_1 = __importDefault(require("../model/category_model"));
const ageRating_model_1 = __importDefault(require("../model/ageRating_model"));
const movieProvider_1 = __importDefault(require("../model/movieProvider"));
const genre_model_1 = __importDefault(require("../model/genre_model"));
const languages_model_1 = __importDefault(require("../model/languages_model"));
const videoQuality_model_1 = __importDefault(require("../model/videoQuality_model"));
const ApiFeatures_1 = __importDefault(require("../utils/ApiFeatures"));
exports.handleGetMovies = (0, asyncErrorHandler_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = new ApiFeatures_1.default(movie_model_1.default.find(), req.query);
    // Apply filters, sorting, pagination, etc.
    const filteredQuery = movie.filter().sort().paginate({}).limitFields();
    const populatedMovie = filteredQuery
        .populate("genre")
        .populate("languages")
        .populate("videoQualitys")
        .populate("category")
        .populate("ageRating")
        .populate("movieProvider")
        .populate("Seasons");
    const movies = (yield populatedMovie.query);
    const totalMoviesCount = yield movie_model_1.default.countDocuments();
    const totalPages = Math.ceil(totalMoviesCount / 20);
    if (movies.length == 0) {
        throw new ErrorObject_1.default({
            message: "There is no movie awailable",
            statusCode: 404,
        });
    }
    return (0, ApiResponse_1.SendResponse)({
        res: res,
        TotalPages: totalPages,
        length: movies.length,
        message: "got movies",
        statusCode: 200,
        data: movies,
    });
}));
exports.handleGetLiteMovies = (0, asyncErrorHandler_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // throw new CustomError({
    //   message: "There is no movie awailable",
    //   statusCode: 404,
    // });
    req.query.fields = "slugUrl,name,posterImage";
    const { pageNumber } = req.params;
    const movie = new ApiFeatures_1.default(movie_model_1.default.find(), req.query);
    const filteredQuery = movie
        .filter()
        .sort()
        .paginate({ pageNumber: parseInt(pageNumber, 10) })
        .limitFields();
    const populatedMovie = filteredQuery;
    const movies = (yield populatedMovie.query);
    const totalMoviesCount = yield movie_model_1.default.countDocuments();
    const totalPages = Math.ceil(totalMoviesCount / 20);
    if (movies.length == 0) {
        throw new ErrorObject_1.default({
            message: "There is no movie awailable",
            statusCode: 404,
        });
    }
    return (0, ApiResponse_1.SendResponse)({
        res: res,
        TotalPages: totalPages,
        length: movies.length,
        message: "got movies",
        statusCode: 200,
        data: movies,
    });
}));
exports.handleGetMovieBySlugUrl = (0, asyncErrorHandler_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slugName } = req.params;
    const movieOBJ = new ApiFeatures_1.default(movie_model_1.default.findOne({ slugUrl: slugName }), req.query);
    req.query.fields =
        "name,content,slugUrl,posterImage,bannerImage,screenShorts,downloadLink,releaseYear,genre,languages,isDualAudio,Seasons,isSeries,category,ageRating,movieProvider";
    const movie = yield movieOBJ
        .limitFields()
        .populate("genre")
        .populate("languages")
        .populate("videoQualitys")
        .populate("category")
        .populate("ageRating")
        .populate("movieProvider")
        .populate("Seasons").query;
    // const Movie = await MovieModel.findById(movieID);
    if (!movie || movie.length == 0) {
        throw new ErrorObject_1.default({
            message: `sorry we not able to file your movie`,
            statusCode: 404,
        });
    }
    return (0, ApiResponse_1.SendResponse)({
        res: res,
        statusCode: 200,
        message: "Movie fetched Successful!",
        data: movie,
    });
}));
exports.validateMovieModdelware = [
    (0, express_validator_1.body)("slugUrl").notEmpty().withMessage("you have to provide slugUrl"),
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage("You have to provide movie name")
        .isLength({ min: 1 })
        .withMessage("Movie name must be at least 1 character long."),
    (0, express_validator_1.body)("content")
        .notEmpty()
        .withMessage("Please provide content or at least download link"),
    (0, express_validator_1.body)("releaseYear")
        .isInt({ min: 1800, max: new Date().getFullYear() })
        .withMessage(`Release year must be between 1800 and ${new Date().getFullYear()}`),
    (0, express_validator_1.body)("genre")
        .isArray({ min: 1 })
        .withMessage("At least one genre is required"),
    (0, express_validator_1.body)("languages")
        .isArray({ min: 1 })
        .withMessage("At least one language is required"),
    (0, express_validator_1.body)("category").notEmpty().withMessage("Category is required"),
    (0, express_validator_1.body)("ageRating").notEmpty().withMessage("Age rating is required"),
    (0, express_validator_1.body)("movieProvider").notEmpty().withMessage("Movie provider is required"),
];
exports.handleCerateMovie = (0, asyncErrorHandler_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return (0, ApiResponse_1.SendResponse)({
            res: res,
            message: "validation error",
            data: errors.array(),
            statusCode: 400,
        });
    }
    const { slugUrl, category, ageRating, movieProvider, genre, languages, videoQualitys, Seasons, } = req.body;
    // Validate that referenced documents exist
    const [categoryExists, ageRatingExists, movieProviderExists, genresExist, languagesExist, videoQualitysExist, seasonsExist,] = yield Promise.all([
        category_model_1.default.exists({ _id: category }),
        ageRating_model_1.default.exists({ _id: ageRating }),
        movieProvider_1.default.exists({ _id: movieProvider }),
        genre_model_1.default.find({ _id: { $in: genre } }).select("_id"),
        languages_model_1.default.find({ _id: { $in: languages } }).select("_id"),
        videoQuality_model_1.default.find({ _id: { $in: videoQualitys } }).select("_id"),
        movie_model_1.default.find({ _id: { $in: Seasons } }).select("_id"),
    ]);
    if (!categoryExists) {
        throw new ErrorObject_1.default({
            message: "Invalid category ID",
            statusCode: 400,
        });
    }
    if (!ageRatingExists) {
        throw new ErrorObject_1.default({
            message: "Invalid age rating ID",
            statusCode: 400,
        });
    }
    if (!movieProviderExists) {
        throw new ErrorObject_1.default({
            message: "Invalid movie provider ID",
            statusCode: 400,
        });
    }
    if (genresExist.length !== genre.length) {
        throw new ErrorObject_1.default({
            message: "Invalid genre ID(s)",
            statusCode: 400,
        });
    }
    if (languagesExist.length !== languages.length) {
        throw new ErrorObject_1.default({
            message: "Invalid language ID(s)",
            statusCode: 400,
        });
    }
    if (videoQualitysExist.length !== videoQualitys.length) {
        throw new ErrorObject_1.default({
            message: "Invalid video quality ID(s)",
            statusCode: 400,
        });
    }
    if (seasonsExist.length !== Seasons.length) {
        throw new ErrorObject_1.default({
            message: "Invalid season ID(s)",
            statusCode: 400,
        });
    }
    let slugUrlValue = slugUrl.startsWith("/") ? slugUrl.slice(1) : slugUrl;
    // Replace all special characters with "-"
    slugUrlValue = slugUrlValue.replace(/[^a-zA-Z0-9]/g, "-");
    req.body.slugUrl = slugUrlValue;
    const newMovie = yield movie_model_1.default.create(req.body);
    if (!newMovie) {
        throw new ErrorObject_1.default({
            message: "somthing went wrong",
            statusCode: 400,
        });
    }
    return (0, ApiResponse_1.SendResponse)({
        res: res,
        message: "movie created!",
        statusCode: 200,
        data: newMovie,
    });
}));
exports.handleUpdateMovie = (0, asyncErrorHandler_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    const { MoveiId } = req.params;
    if (!errors.isEmpty()) {
        return (0, ApiResponse_1.SendResponse)({
            res: res,
            message: "validation error",
            data: errors.array(),
            statusCode: 400,
        });
    }
    const { slugUrl, category, ageRating, movieProvider, genre, languages, videoQualitys, Seasons, } = req.body;
    // Validate that referenced documents exist
    const [categoryExists, ageRatingExists, movieProviderExists, genresExist, languagesExist, videoQualitysExist, seasonsExist,] = yield Promise.all([
        category_model_1.default.exists({ _id: category }),
        ageRating_model_1.default.exists({ _id: ageRating }),
        movieProvider_1.default.exists({ _id: movieProvider }),
        genre_model_1.default.find({ _id: { $in: genre } }).select("_id"),
        languages_model_1.default.find({ _id: { $in: languages } }).select("_id"),
        videoQuality_model_1.default.find({ _id: { $in: videoQualitys } }).select("_id"),
        movie_model_1.default.find({ _id: { $in: Seasons } }).select("_id"),
    ]);
    if (!categoryExists) {
        throw new ErrorObject_1.default({
            message: "Invalid category ID",
            statusCode: 400,
        });
    }
    if (!ageRatingExists) {
        throw new ErrorObject_1.default({
            message: "Invalid age rating ID",
            statusCode: 400,
        });
    }
    if (!movieProviderExists) {
        throw new ErrorObject_1.default({
            message: "Invalid movie provider ID",
            statusCode: 400,
        });
    }
    if (genresExist.length !== genre.length) {
        throw new ErrorObject_1.default({
            message: "Invalid genre ID(s)",
            statusCode: 400,
        });
    }
    if (languagesExist.length !== languages.length) {
        throw new ErrorObject_1.default({
            message: "Invalid language ID(s)",
            statusCode: 400,
        });
    }
    if (videoQualitysExist.length !== videoQualitys.length) {
        throw new ErrorObject_1.default({
            message: "Invalid video quality ID(s)",
            statusCode: 400,
        });
    }
    if (seasonsExist.length !== Seasons.length) {
        throw new ErrorObject_1.default({
            message: "Invalid season ID(s)",
            statusCode: 400,
        });
    }
    let slugUrlValue = slugUrl.startsWith("/") ? slugUrl.slice(1) : slugUrl;
    // Replace all special characters with "-"
    slugUrlValue = slugUrlValue.replace(/[^a-zA-Z0-9]/g, "-");
    req.body.slugUrl = slugUrlValue;
    const newMovie = yield movie_model_1.default.findByIdAndUpdate(MoveiId, req.body, {
        new: true,
        runValidators: true,
    });
    if (!newMovie) {
        throw new ErrorObject_1.default({
            message: "somthing went wrong",
            statusCode: 400,
        });
    }
    return (0, ApiResponse_1.SendResponse)({
        res: res,
        message: "movie created!",
        statusCode: 200,
        data: newMovie,
    });
}));
