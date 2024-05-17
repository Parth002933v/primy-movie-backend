import { Document, model, Schema } from "mongoose";

export interface IAgeRating extends Document {
  rating: string;
  defination: string;
}

const ageRatingSchema = new Schema<IAgeRating>({
  rating: {
    type: String,
    unique: true,
    required: [true, "Please provide category"],
  },
  defination: {
    type: String,
  },
});

const AgeRatingModel = model<IAgeRating>("ageRatings", ageRatingSchema);
export default AgeRatingModel;

// const ageRating = [
//   "G", // General Audiences
//   "PG", // Parental Guidance Suggested
//   "PG-13", // Parents Strongly Cautioned
//   "R", // Restricted
//   "NC-17", // Adults Only
// ];
