import { Document, model, Schema } from "mongoose";

export interface IGenre extends Document {
  name: string;
}

const GenreSchema = new Schema<IGenre>({
  name: { type: String, required: true, unique: true },
});

const GenreModel = model<IGenre>("genres", GenreSchema);

export default GenreModel;

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
