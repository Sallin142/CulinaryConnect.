import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import '../stylesheets/add.css';

export const Edit = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: ""
  });

  const [formIsValid, setFormIsValid] = useState(true);
  const navigate = useNavigate();
  const { recipeId } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/${recipeId}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Failed to fetch the recipe:", error);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setRecipe(prevState => ({ ...prevState, [name]: value }));
  };

  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[idx].name = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, { name: "" }];
    setRecipe({ ...recipe, ingredients });
  };

  const handleRemoveIngredient = (idx) => {
    const ingredients = [...recipe.ingredients].filter((_, index) => index !== idx);
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (recipe.ingredients.filter(ingredient => Boolean(ingredient.name)).length === 0) {
      setFormIsValid(false);
      return;
    } else {
      setFormIsValid(true);
    }

    try {
      await axios.put(`http://localhost:3001/recipes/${recipeId}`, recipe);
      navigate("/saved");
    } catch (error) {
      console.error("Error updating recipe: ", error);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Edit Recipe</h2>
      {!formIsValid && <p>Please add at least one ingredient.</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={recipe.name} onChange={handleChange} required />

        <label htmlFor="instructions">Instructions</label>
        <textarea id="instructions" name="instructions" value={recipe.instructions} onChange={handleChange} required />

        <label htmlFor="imageUrl">Image URL</label>
        <input type="text" id="imageUrl" name="imageUrl" value={recipe.imageUrl} onChange={handleChange} />

        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              name="ingredients"
              value={ingredient.name}
              onChange={(event) => handleIngredientChange(event, index)}
              required
            />
            <button type="button" onClick={() => handleRemoveIngredient(index)}>
              Remove Ingredient
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
        <button type="submit">Update Recipe!</button>
      </form>
    </div>
  );
};
