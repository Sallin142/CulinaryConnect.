import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../stylesheets/add.css'

export const Add = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: ""
  });

  const [formIsValid, setFormIsValid] = useState(true);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const {name, value} = event.target;
    setRecipe({...recipe, [name]: value});
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleRemoveIngredient = (idx) => {
    const ingredients = [...recipe.ingredients].filter((_, index) => index !== idx);
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (recipe.ingredients.filter(Boolean).length === 0) {
      setFormIsValid(false);
      return;
    } else {
      setFormIsValid(true);
    }

    try {
      await axios.post(`http://localhost:3001/recipes/`, recipe);
      navigate("/saved");
    } catch (error) {
      console.error("Error creating recipe: ", error);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Add Recipe</h2>
      {!formIsValid && <p>Please add at least one ingredient.</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} required />

        <label htmlFor="instructions">Instructions</label>
        <textarea id="instructions" name="instructions" onChange={handleChange} required />

        <label htmlFor="imageUrl">Image URL</label>
        <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} />


        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
              required
            />
            <button type="button" onClick={() => handleRemoveIngredient(index)}>
              Remove Ingredient
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
        <button type="submit">Add recipe!</button>
      </form>
    </div>
  );
};