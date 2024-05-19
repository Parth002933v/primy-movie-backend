import express, { NextFunction, Request, Response } from "express";
import {
  handleCerateMovie,
  handleGetLiteMovies,
  handleGetMovieByID,
  // handleGetMovieByID,
  handleGetMovies,
  validateMovieModdelware,
} from "../controller/movies.controller";
import { verifyJWT } from "../middleware/auth.middleware";

const router = express.Router();

router
  .route("/")
  .get(handleGetLiteMovies)
  .post(verifyJWT, validateMovieModdelware, handleCerateMovie);

router.route("/:movieID").get(handleGetMovieByID);

router.route("/lite").get(handleGetLiteMovies);
export default router;
