"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GenreSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
});
const GenreModel = (0, mongoose_1.model)("genres", GenreSchema);
exports.default = GenreModel;
// genres = [
//   "Action",
//   "Adventure",
//   "Animation",
//   "Comedy",
//   "Crime",
//   "Drama",
//   "Fantasy",
//   "Historical",
//   "Horror",
//   "Mystery",
//   "Romance",
//   "Science Fiction",
//   "Thriller",
//   "War",
//   "Western"
// ]
