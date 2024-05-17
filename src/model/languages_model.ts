import { Document, model, Schema } from "mongoose";

export interface Ilanguage extends Document {
  languageName: string;
}

const languageSchema = new Schema<Ilanguage>({
  languageName: {
    type: String,
    unique: true,
    required: [true, "Language is required"],
  },
});

const LanguageModel = model<Ilanguage>("languages", languageSchema);
export default LanguageModel;
