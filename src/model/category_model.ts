import { Document, model, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    unique: true,
    required: [true, "Please provide category"],
  },
});

const CategoryModel = model<ICategory>("categorys", categorySchema);
export default CategoryModel;

// const category = ["anime", "english", "trending", "k - drama"];
