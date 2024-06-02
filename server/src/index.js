import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { recipeRouter } from "./routes/recipes.js";
import { ingredientRouter } from "./routes/ingredients.js";
import path from "path";
import session from "express-session";
import axios from "axios";
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(cors());
app.use(session({ secret: "your-secret-key", resave: true, saveUninitialized: true }));
dotenv.config();
// Make sure CORS is set up before your routes
app.use("/recipes", recipeRouter);
app.use("/ingredients", ingredientRouter);
// Create environment variable
mongoose.connect(process.env.MONGODB_URL);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Server started on port", port));
