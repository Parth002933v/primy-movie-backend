import { body, validationResult } from "express-validator";
import MovieModel, { IMovie } from "../model/movie_model";
import { SendResponse } from "../utils/ApiResponse";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import { Request, Response, NextFunction, query } from "express";
import CustomError from "../utils/ErrorObject";
import CategoryModel from "../model/category_model";
import AgeRatingModel from "../model/ageRating_model";
import MovieProviderModel from "../model/movieProvider";
import GenreModel from "../model/genre_model";
import LanguageModel from "../model/languages_model";
import VideoQualityModel from "../model/videoQuality_model";
import ApiFeatures from "../utils/ApiFeatures";

export const handleGetMovies = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const movie = new ApiFeatures(MovieModel.find(), req.query);

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

    const movies = (await populatedMovie.query) as typeof MovieModel;

    const totalMoviesCount = await MovieModel.countDocuments();

    const totalPages = Math.ceil(totalMoviesCount / 20);

    if (movies.length == 0) {
      throw new CustomError({
        message: "There is no movie awailable",
        statusCode: 404,
      });
    }

    return SendResponse({
      res: res,

      TotalPages: totalPages,
      length: movies.length,
      message: "got movies",
      statusCode: 200,
      data: movies,
    });
  }
);

export const handleGetLiteMovies = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // throw new CustomError({
    //   message: "There is no movie awailable",
    //   statusCode: 404,
    // });
    req.query.fields = "slugUrl,name,posterImage";

    const { pageNumber } = req.params;
    const movie = new ApiFeatures(MovieModel.find(), req.query);

    const filteredQuery = movie
      .filter()
      .sort()
      .paginate({ pageNumber: parseInt(pageNumber, 10) })
      .limitFields();

    const populatedMovie = filteredQuery;

    const movies = (await populatedMovie.query) as typeof MovieModel;

    const totalMoviesCount = await MovieModel.countDocuments();

    const totalPages = Math.ceil(totalMoviesCount / 20);

    if (movies.length == 0) {
      throw new CustomError({
        message: "There is no movie awailable",
        statusCode: 404,
      });
    }

    return SendResponse({
      res: res,

      TotalPages: totalPages,
      length: movies.length,
      message: "got movies",
      statusCode: 200,
      data: movies,
    });
  }
);

export const handleGetMovieBySlugUrl = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { slugName } = req.params;

    const movieOBJ = new ApiFeatures(
      MovieModel.findOne({ slugUrl: slugName }),
      req.query
    );

    req.query.fields =
      "name,content,slugUrl,posterImage,bannerImage,screenShorts,downloadLink,releaseYear,genre,languages,isDualAudio,Seasons,isSeries,category,ageRating,movieProvider";

    const movie = await movieOBJ
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
      throw new CustomError({
        message: `sorry we not able to file your movie`,
        statusCode: 404,
      });
    }

    return SendResponse({
      res: res,
      statusCode: 200,
      message: "Movie fetched Successful!",
      data: movie,
    });
  }
);

export const validateMovieModdelware = [
  body("slugUrl").notEmpty().withMessage("you have to provide slugUrl"),
  body("name")
    .notEmpty()
    .withMessage("You have to provide movie name")
    .isLength({ min: 1 })
    .withMessage("Movie name must be at least 1 character long."),
  body("content")
    .notEmpty()
    .withMessage("Please provide content or at least download link"),
  body("releaseYear")
    .isInt({ min: 1800, max: new Date().getFullYear() })
    .withMessage(
      `Release year must be between 1800 and ${new Date().getFullYear()}`
    ),
  body("genre")
    .isArray({ min: 1 })
    .withMessage("At least one genre is required"),
  body("languages")
    .isArray({ min: 1 })
    .withMessage("At least one language is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("ageRating").notEmpty().withMessage("Age rating is required"),
  body("movieProvider").notEmpty().withMessage("Movie provider is required"),
];
export const handleCerateMovie = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return SendResponse({
        res: res,
        message: "validation error",
        data: errors.array(),
        statusCode: 400,
      });
    }

    const {
      slugUrl,
      category,
      ageRating,
      movieProvider,
      genre,
      languages,
      videoQualitys,
      Seasons,
    } = req.body;

    // Validate that referenced documents exist
    const [
      categoryExists,
      ageRatingExists,
      movieProviderExists,
      genresExist,
      languagesExist,
      videoQualitysExist,
      seasonsExist,
    ] = await Promise.all([
      CategoryModel.exists({ _id: category }),
      AgeRatingModel.exists({ _id: ageRating }),
      MovieProviderModel.exists({ _id: movieProvider }),
      GenreModel.find({ _id: { $in: genre } }).select("_id"),
      LanguageModel.find({ _id: { $in: languages } }).select("_id"),
      VideoQualityModel.find({ _id: { $in: videoQualitys } }).select("_id"),
      MovieModel.find({ _id: { $in: Seasons } }).select("_id"),
    ]);

    if (!categoryExists) {
      throw new CustomError({
        message: "Invalid category ID",
        statusCode: 400,
      });
    }
    if (!ageRatingExists) {
      throw new CustomError({
        message: "Invalid age rating ID",
        statusCode: 400,
      });
    }
    if (!movieProviderExists) {
      throw new CustomError({
        message: "Invalid movie provider ID",
        statusCode: 400,
      });
    }
    if (genresExist.length !== genre.length) {
      throw new CustomError({
        message: "Invalid genre ID(s)",
        statusCode: 400,
      });
    }
    if (languagesExist.length !== languages.length) {
      throw new CustomError({
        message: "Invalid language ID(s)",
        statusCode: 400,
      });
    }

    if (videoQualitysExist.length !== videoQualitys.length) {
      throw new CustomError({
        message: "Invalid video quality ID(s)",
        statusCode: 400,
      });
    }
    if (seasonsExist.length !== Seasons.length) {
      throw new CustomError({
        message: "Invalid season ID(s)",
        statusCode: 400,
      });
    }

    let slugUrlValue = slugUrl.startsWith("/") ? slugUrl.slice(1) : slugUrl;

    // Replace all special characters with "-"
    slugUrlValue = slugUrlValue.replace(/[^a-zA-Z0-9]/g, "-");

    req.body.slugUrl = slugUrlValue;

    const newMovie = await MovieModel.create(req.body);

    if (!newMovie) {
      throw new CustomError({
        message: "somthing went wrong",
        statusCode: 400,
      });
    }

    return SendResponse({
      res: res,
      message: "movie created!",
      statusCode: 200,
      data: newMovie,
    });
  }
);

export const handleUpdateMovie = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const { MoveiId } = req.params;

    if (!errors.isEmpty()) {
      return SendResponse({
        res: res,
        message: "validation error",
        data: errors.array(),
        statusCode: 400,
      });
    }

    const {
      slugUrl,
      category,
      ageRating,
      movieProvider,
      genre,
      languages,
      videoQualitys,
      Seasons,
    } = req.body;

    // Validate that referenced documents exist
    const [
      categoryExists,
      ageRatingExists,
      movieProviderExists,
      genresExist,
      languagesExist,
      videoQualitysExist,
      seasonsExist,
    ] = await Promise.all([
      CategoryModel.exists({ _id: category }),
      AgeRatingModel.exists({ _id: ageRating }),
      MovieProviderModel.exists({ _id: movieProvider }),
      GenreModel.find({ _id: { $in: genre } }).select("_id"),
      LanguageModel.find({ _id: { $in: languages } }).select("_id"),
      VideoQualityModel.find({ _id: { $in: videoQualitys } }).select("_id"),
      MovieModel.find({ _id: { $in: Seasons } }).select("_id"),
    ]);

    if (!categoryExists) {
      throw new CustomError({
        message: "Invalid category ID",
        statusCode: 400,
      });
    }
    if (!ageRatingExists) {
      throw new CustomError({
        message: "Invalid age rating ID",
        statusCode: 400,
      });
    }
    if (!movieProviderExists) {
      throw new CustomError({
        message: "Invalid movie provider ID",
        statusCode: 400,
      });
    }
    if (genresExist.length !== genre.length) {
      throw new CustomError({
        message: "Invalid genre ID(s)",
        statusCode: 400,
      });
    }
    if (languagesExist.length !== languages.length) {
      throw new CustomError({
        message: "Invalid language ID(s)",
        statusCode: 400,
      });
    }

    if (videoQualitysExist.length !== videoQualitys.length) {
      throw new CustomError({
        message: "Invalid video quality ID(s)",
        statusCode: 400,
      });
    }
    if (seasonsExist.length !== Seasons.length) {
      throw new CustomError({
        message: "Invalid season ID(s)",
        statusCode: 400,
      });
    }

    let slugUrlValue = slugUrl.startsWith("/") ? slugUrl.slice(1) : slugUrl;

    // Replace all special characters with "-"
    slugUrlValue = slugUrlValue.replace(/[^a-zA-Z0-9]/g, "-");

    req.body.slugUrl = slugUrlValue;

    const newMovie = await MovieModel.findByIdAndUpdate(MoveiId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!newMovie) {
      throw new CustomError({
        message: "somthing went wrong",
        statusCode: 400,
      });
    }

    return SendResponse({
      res: res,
      message: "movie created!",
      statusCode: 200,
      data: newMovie,
    });
  }
);
