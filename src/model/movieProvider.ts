// These model contains information about the movie which is originally get from

import { Document, model, Schema } from "mongoose";

export interface IMovieProvider extends Document {
  providerName: string;
  image: string;
}

const movieProviderSchema = new Schema<IMovieProvider>({
  providerName: {
    type: String,
    required: [true, "please enter providerName"],
    unique: true,
  },
  image: { type: String, required: [true, "link is required"], unique: true },
});

const MovieProviderModel = model<IMovieProvider>(
  "movieProviders",
  movieProviderSchema
);

export default MovieProviderModel;
