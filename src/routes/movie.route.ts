import express from "express";
import {
  handleCerateMovie,
  handleGetMovies,
  validateMovieModdelware,
} from "../controller/movies.controller";

const router = express.Router();

router
  .route("/")
  .get(handleGetMovies)
  .post(validateMovieModdelware, handleCerateMovie);

export default router;
