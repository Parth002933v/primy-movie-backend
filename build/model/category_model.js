"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Please provide category"],
    },
});
const CategoryModel = (0, mongoose_1.model)("categorys", categorySchema);
exports.default = CategoryModel;
// const category = ["anime", "english", "trending", "k - drama"];
