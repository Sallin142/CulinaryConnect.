import express from "express";
import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipe.js";
import { IngredientModel } from "../models/Ingredient.js";
import cors from "cors";

const router = express.Router();
router.use(cors());
router.get("/", async(req, res) => {
    try {
        const response = await RecipesModel.find({}).populate('ingredients');
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:recipeId", async (req, res) => {
    
    try {
        const recipe = await RecipesModel.findById(req.params.recipeId).populate('ingredients');;
        
        if (!recipe) {
            console.log("recipe not found");
            return res.status(404).json({ message: "Recipe not found" });
        }
        return res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// router.post("/", async (req, res) => {
//     const recipe = new RecipesModel({
//         ...req.body
//     });
//     await recipe.save();
// });

router.post("/", async (req, res) => {
    try {
        const { ingredients: ingredientNames } = req.body;
        const ingredientIds = await Promise.all(ingredientNames.map(async (ingredientName) => {
            let ingredient = await IngredientModel.findOne({ name: ingredientName });
            
            if (!ingredient) {
                ingredient = new IngredientModel({ name: ingredientName });
                await ingredient.save();
            }
            return ingredient._id;
        }));

        const recipe = new RecipesModel({
            ...req.body,
            ingredients: ingredientIds
        });

        await recipe.save();
        res.status(201).json(recipe);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { ingredients: ingredientData } = req.body;

        const ingredientIds = await Promise.all(ingredientData.map(async (ingredientInfo) => {
            let ingredient = await IngredientModel.findById(ingredientInfo._id);
            
            if (ingredient) {
                // Update ingredient only if it exists
                ingredient.name = ingredientInfo.name;
                await ingredient.save();
                return ingredient._id;
            }
            // If ingredient is not found in DB for some reason, handle accordingly, maybe throw an error.
            throw new Error('Ingredient not found');

        }));

        // Now update the recipe
        req.body.ingredients = ingredientIds; // Override ingredients with IDs
        const updatedRecipe = await RecipesModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedRecipe) {
            res.status(404).json({ message: "Recipe not found" });
        } else {
            res.status(200).json(updatedRecipe);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        // Find the recipe by ID
        const recipe = await RecipesModel.findById(req.params.id);

        // If recipe doesn't exist, send an error response
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        // Delete the associated ingredients
        for (const ingredientId of recipe.ingredients) {
            await IngredientModel.findByIdAndDelete(ingredientId);
        }

        // Delete the recipe
        await RecipesModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Recipe and its ingredients deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export {router as recipeRouter};
