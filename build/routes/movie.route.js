"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movies_controller_1 = require("../controller/movies.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router
    .route("/")
    .get(movies_controller_1.handleGetLiteMovies)
    .post(auth_middleware_1.verifyJWT, movies_controller_1.validateMovieModdelware, movies_controller_1.handleCerateMovie);
router
    .route("/edit/:MoveiId")
    .put(auth_middleware_1.verifyJWT, movies_controller_1.validateMovieModdelware, movies_controller_1.handleUpdateMovie);
router.route("/page/:pageNumber").get(movies_controller_1.handleGetLiteMovies);
router.route("/:slugName").get(movies_controller_1.handleGetMovieBySlugUrl);
exports.default = router;
