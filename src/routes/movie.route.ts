import express, { NextFunction, Request, Response } from "express";
import {
  handleCerateMovie,
  handleGetLiteMovies,
  handleGetMovieBySlugUrl,
  handleUpdateMovie,
  validateMovieModdelware,
} from "../controller/movies.controller";
import { verifyJWT } from "../middleware/auth.middleware";

const router = express.Router();

router
  .route("/")
  .get(handleGetLiteMovies)
  .post(verifyJWT, validateMovieModdelware, handleCerateMovie);

router
  .route("/edit/:MoveiId")
  .put(verifyJWT, validateMovieModdelware, handleUpdateMovie);

router.route("/page/:pageNumber").get(handleGetLiteMovies);

router.route("/:slugName").get(handleGetMovieBySlugUrl);

export default router;
