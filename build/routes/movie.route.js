"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movies_controller_1 = require("../controller/movies.controller");
const router = express_1.default.Router();
router
    .route("/")
    .get(movies_controller_1.handleGetMovies)
    .post(movies_controller_1.validateMovieModdelware, movies_controller_1.handleCerateMovie);
exports.default = router;
