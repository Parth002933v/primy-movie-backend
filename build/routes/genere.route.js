"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const genere_controller_1 = require("../controller/genere.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
// /api/generes
const router = express_1.default.Router();
router.route("/").get(genere_controller_1.getAllGeneres).post(auth_middleware_1.verifyJWT, genere_controller_1.handleCreateGenere);
exports.default = router;
