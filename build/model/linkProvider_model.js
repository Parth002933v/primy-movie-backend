"use strict";
// this model us use for Cloud hosting provider where all movies are uploaded
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const linkProviderSchema = new mongoose_1.Schema({
    providerName: {
        type: String,
        required: [true, "please enter providerName"],
        unique: true,
    },
    link: { type: String, required: [true, "link the required"], unique: true },
});
const LinkProviderModel = (0, mongoose_1.model)("linkProviders", linkProviderSchema);
exports.default = LinkProviderModel;
