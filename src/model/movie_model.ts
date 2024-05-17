import { Document, model, Schema, Types } from "mongoose";
import { IGenre } from "./genre_model";
import { Ilanguage } from "./languages_model";
import { IVideoQuality } from "./videoQuality_model";
import { ICategory } from "./category_model";
import { IAgeRating } from "./ageRating_model";
import { IMovieProvider } from "./movieProvider";

interface downloadLink {
  text: string;
  link: string;
}

export interface IMovie extends Document {
  name: string;
  content: string;
  posterImage: string;
  bannerImage: String;
  screenShorts: string[];
  downloadLink: downloadLink[];
  releaseYear: number;
  genre: IGenre["_id"][];
  languages: Ilanguage["_id"][];
  isDualAudio: boolean;
  videoQualitys: IVideoQuality["_id"][];
  Seasons: IMovie["_id"][];
  isSeries: boolean;
  category: ICategory["_id"];
  ageRating: IAgeRating["_id"];
  movieProvider: IMovieProvider["_id"];
  totalDownloads: number;
  tags: string[];
}

const movieSchema = new Schema<IMovie>({
  name: { type: String, required: [true, "You have to provide movie name"] },
  content: {
    type: String,
    required: [true, "please provide content or atleast download link"],
  },
  posterImage: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
  },
  bannerImage: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
  },
  screenShorts: [{ type: String }],
  downloadLink: [{ text: String, link: String }],
  releaseYear: { type: Number, default: new Date().getFullYear() },
  genre: [{ type: Schema.Types.ObjectId, ref: "genres" }],
  languages: [{ type: Schema.Types.ObjectId, ref: "languages" }],
  isDualAudio: { type: Boolean, default: false },
  videoQualitys: [{ type: Schema.Types.ObjectId, ref: "videoQualitys" }],
  Seasons: [{ type: Schema.Types.ObjectId, ref: "movies" }],
  isSeries: { type: Boolean, default: false },
  category: { type: Schema.Types.ObjectId, ref: "categorys" },
  ageRating: { type: Schema.Types.ObjectId, ref: "ageRatings" },
  movieProvider: { type: Schema.Types.ObjectId, ref: "movieProviders" },
  totalDownloads: { type: Number, default: 0 },
  tags: [{ type: String }],
});

const MovieModel = model<IMovie>("movies", movieSchema);

export default MovieModel;
