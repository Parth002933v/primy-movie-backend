"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "please enter email"],
    },
    name: { type: String, required: [true, "provide name"] },
    text: { type: String, required: [true, "enter comment"] },
    movieId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "movies",
        required: [true, "movie ID is required for comment"],
    },
    repliedTo: { type: mongoose_1.Schema.Types.ObjectId, ref: "comments" },
});
const CommentModel = (0, mongoose_1.model)("comments", commentSchema);
exports.default = CommentModel;
