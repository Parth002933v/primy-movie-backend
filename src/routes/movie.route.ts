import express from "express";
import {
  handleCerateMovie,
  handleGetMovies,
  validateMovie,
} from "../controller/movies.controller";

const router = express.Router();

router.route("/").get(handleGetMovies).post(validateMovie, handleCerateMovie);

export default router;
