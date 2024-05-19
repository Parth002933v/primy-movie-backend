"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const videoQualitySchema = new mongoose_1.Schema({
    Quality: {
        type: String,
        unique: true,
        required: [true, "Please provide video quality"],
    },
    Nickname: { type: String, required: false },
});
const VideoQualityModel = (0, mongoose_1.model)("videoQualitys", videoQualitySchema);
exports.default = VideoQualityModel;
