"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const ageRating_controller_1 = require("../controller/ageRating.controller");
// /api/generes
const router = express_1.default.Router();
router
    .route("/")
    .get(ageRating_controller_1.handleGetAllAgeRatings)
    .post(auth_middleware_1.verifyJWT, ageRating_controller_1.hanldeCreateAgeRatings);
exports.default = router;
