"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieProvider_controller_1 = require("../controller/movieProvider.controller");
const upload_1 = require("../utils/upload");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router
    .route("/")
    .get(movieProvider_controller_1.handleGetMovieProvider)
    .post(auth_middleware_1.verifyJWT, upload_1.upload.single("providerImage"), movieProvider_controller_1.handleCreateMovieProvider);
exports.default = router;
