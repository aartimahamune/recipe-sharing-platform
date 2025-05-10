import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: String,
      required: true,
    },
    diet: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    userRef:
        {
            type : String,
            required : true,
        }
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;
