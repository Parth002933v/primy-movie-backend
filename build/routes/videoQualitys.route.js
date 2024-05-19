"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videoQuality_Controller_1 = require("../controller/videoQuality.Controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router
    .route("/")
    .get(videoQuality_Controller_1.handleGetAllVideoQuality)
    .post(auth_middleware_1.verifyJWT, videoQuality_Controller_1.hanldeCreateVideoQuality);
exports.default = router;
