import express, { NextFunction, Request, Response } from "express";
import {
  handleCerateMovie,
  handleGetLiteMovies,
  handleGetMovieByID,
  validateMovieModdelware,
} from "../controller/movies.controller";
import { verifyJWT } from "../middleware/auth.middleware";

const router = express.Router();

router
  .route("/")
  .get(handleGetLiteMovies)
  .post(verifyJWT, validateMovieModdelware, handleCerateMovie);

router.route("/page/:pageNumber").get(handleGetLiteMovies);

router.route("/:movieID").get(handleGetMovieByID);

export default router;
