import mongoose from "mongoose";

// Ingredient Schema
const IngredientSchema = mongoose.Schema({
  name: { type: String, required: true },
}, {
  timestamps: true
});

// Register the Ingredient model
export const IngredientModel = mongoose.model("Ingredient", IngredientSchema);