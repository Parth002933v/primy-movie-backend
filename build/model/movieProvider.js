"use strict";
// These model contains information about the movie which is originally get from
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const movieProviderSchema = new mongoose_1.Schema({
    providerName: {
        type: String,
        required: [true, "please enter providerName"],
        unique: true,
    },
    image: { type: String, required: [true, "link is required"], unique: true },
});
const MovieProviderModel = (0, mongoose_1.model)("movieProviders", movieProviderSchema);
exports.default = MovieProviderModel;
