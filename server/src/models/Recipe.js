import mongoose from "mongoose";

const RecipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
      required: true,
    },
  ],
  instructions: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  lastModified: { 
    type: Date, 
    default: Date.now 
  },
}, {
  timestamps: true
});

// Middleware to set lastModified to the current date on each save
RecipeSchema.pre('save', function (next) {
  this.lastModified = Date.now();
  next();
});

export const RecipesModel = mongoose.model("Recipes", RecipeSchema);