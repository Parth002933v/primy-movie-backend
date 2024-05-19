"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ageRatingSchema = new mongoose_1.Schema({
    rating: {
        type: String,
        unique: true,
        required: [true, "Please provide category"],
    },
    defination: {
        type: String,
    },
});
const AgeRatingModel = (0, mongoose_1.model)("ageRatings", ageRatingSchema);
exports.default = AgeRatingModel;
// const ageRating = [
//   "G", // General Audiences
//   "PG", // Parental Guidance Suggested
//   "PG-13", // Parents Strongly Cautioned
//   "R", // Restricted
//   "NC-17", // Adults Only
// ];
