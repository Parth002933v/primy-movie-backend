"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controller/category.controller");
// /api/generes
const router = express_1.default.Router();
router.route("/").get(category_controller_1.handleGetAllCategorys);
exports.default = router;
