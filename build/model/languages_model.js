"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const languageSchema = new mongoose_1.Schema({
    languageName: {
        type: String,
        unique: true,
        required: [true, "Language is required"],
    },
});
const LanguageModel = (0, mongoose_1.model)("languages", languageSchema);
exports.default = LanguageModel;
