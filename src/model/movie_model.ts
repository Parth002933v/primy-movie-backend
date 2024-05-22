import { Document, model, Schema, Types } from "mongoose";
import { IGenre } from "./genre_model";
import { Ilanguage } from "./languages_model";
import { IVideoQuality } from "./videoQuality_model";
import { ICategory } from "./category_model";
import { IAgeRating } from "./ageRating_model";
import { IMovieProvider } from "./movieProvider";

export interface downloadLink {
  text: string;
  link: string;
}

export interface IMovie extends Document {
  slugUrl: string;
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

const movieSchema = new Schema<IMovie>(
  {
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
      default:
        "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
    },
    bannerImage: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
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
    genre: [{ type: Schema.Types.ObjectId, ref: "genres", required: true }],
    languages: [
      { type: Schema.Types.ObjectId, ref: "languages", required: true },
    ],
    isDualAudio: { type: Boolean, default: false },
    videoQualitys: [{ type: Schema.Types.ObjectId, ref: "videoQualitys" }],
    Seasons: [{ type: Schema.Types.ObjectId, ref: "movies" }],
    isSeries: { type: Boolean, default: false },
    category: { type: Schema.Types.ObjectId, ref: "categorys", required: true },
    ageRating: {
      type: Schema.Types.ObjectId,
      ref: "ageRatings",
      required: true,
    },
    movieProvider: {
      type: Schema.Types.ObjectId,
      ref: "movieProviders",
      required: true,
    },
    totalDownloads: { type: Number, default: 0 },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const MovieModel = model<IMovie>("movies", movieSchema);

export default MovieModel;
