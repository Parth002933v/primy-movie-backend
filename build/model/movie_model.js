"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const movieSchema = new mongoose_1.Schema({
    slugUrl: {
        type: String,
        unique: true,
        required: [true, "Please provide slug url"],
    },
    name: {
        type: String,
        unique: true,
        required: [true, "You have to provide movie name"],
        minlength: [1, "Movie name must be at least 1 character long."],
    },
    content: {
        type: String,
        required: [true, "please provide content or at least download link"],
    },
    posterImage: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
    },
    bannerImage: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
    },
    screenShorts: [{ type: String }],
    downloadLink: [
        {
            text: { type: String, required: true },
            link: { type: String, required: true },
        },
    ],
    releaseYear: {
        type: Number,
        required: [true, "Please provide release year"],
        min: [1800, "Release year must be after 1800"],
        max: [new Date().getFullYear(), "Release year cannot be in the future"],
    },
    genre: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "genres", required: true }],
    languages: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: "languages", required: true },
    ],
    isDualAudio: { type: Boolean, default: false },
    videoQualitys: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "videoQualitys" }],
    Seasons: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "movies" }],
    isSeries: { type: Boolean, default: false },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: "categorys", required: true },
    ageRating: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ageRatings",
        required: true,
    },
    movieProvider: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "movieProviders",
        required: true,
    },
    totalDownloads: { type: Number, default: 0 },
    tags: [{ type: String }],
}, {
    timestamps: true,
});
const MovieModel = (0, mongoose_1.model)("movies", movieSchema);
exports.default = MovieModel;
