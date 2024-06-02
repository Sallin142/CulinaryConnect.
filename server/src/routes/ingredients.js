import express from "express";
import cors from "cors";
import { IngredientModel } from "../models/Ingredient.js";

const ingredientRouter = express.Router();
ingredientRouter.use(cors());

ingredientRouter.get("/", async(req, res) => {
    const response = await IngredientModel.find({});
    res.json(response);
});



ingredientRouter.get("/:id", async (req, res) => {
    try {
        const ingredient = await IngredientModel.findById(req.params.id);
        if (!ingredient) {
            return res.status(404).json({ message: "Ingredient not found" });
        }
        return res.json(ingredient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

ingredientRouter.post("/", async (req, res) => {
    const ingredient = new IngredientModel({
        ...req.body
    });
    await ingredient.save();
    res.status(201).json(ingredient);
});

ingredientRouter.put("/:id", async (req, res) => {
    const updatedIngredient = await IngredientModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedIngredient) {
        res.status(404).json({ message: "Ingredient not found" });
    } else {
        res.status(200).json(updatedIngredient);
    }
});

ingredientRouter.delete("/:id", async (req, res) => {
    await IngredientModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Ingredient deleted successfully" });
});

export { ingredientRouter };