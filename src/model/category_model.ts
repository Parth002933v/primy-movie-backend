import { Document, model, Schema } from "mongoose";

export interface ICategory extends Document {
  CategoryName: string;
}

const categorySchema = new Schema<ICategory>({
  CategoryName: {
    type: String,
    unique: true,
    required: [true, "Please provide category"],
  },
});

const CategoryModel = model<ICategory>("categorys", categorySchema);
export default CategoryModel;

const category = ["anime", "english", "trending", "k - drama"];
