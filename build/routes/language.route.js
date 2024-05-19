"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const language_controller_1 = require("../controller/language.controller");
const router = express_1.default.Router();
router.route("/").get(language_controller_1.handleGetAllLanguages);
exports.default = router;
