import { Document, model, Schema } from "mongoose";
import { IMovie } from "./movie_model";

export interface IComment extends Document {
  email: string;
  name: string;
  text: string;
  movieId: IMovie["_id"];
  repliedTo: IComment["_id"];
}

const commentSchema = new Schema<IComment>({
  email: {
    type: String,
    required: [true, "please enter email"],
  },
  name: { type: String, required: [true, "provide name"] },

  text: { type: String, required: [true, "enter comment"] },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "movies",
    required: [true, "movie ID is required for comment"],
  },
  repliedTo: { type: Schema.Types.ObjectId, ref: "comments" },
});

const CommentModel = model<IComment>("comments", commentSchema);

export default CommentModel;
