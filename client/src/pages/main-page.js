import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../stylesheets/main.css';

export const Main = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/`);
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getRecipes();
  }, [recipes]);

  const handleRecipeClick = (recipe) => {
    if (selectedRecipes.find(r => r.id === recipe.id)) {
      setSelectedRecipes(selectedRecipes.filter(r => r.id !== recipe.id));
    } else {
      setSelectedRecipes([...selectedRecipes, recipe]);
    }
  }

  const handleDelete = async (recipeId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/recipes/${recipeId}`);
      if(response.status === 200) {
        setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
        setSelectedRecipes(selectedRecipes.filter(recipe => recipe.id !== recipeId));
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  }

  const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <input className="search-recipe" type="text" placeholder="Search Recipes" onChange={handleSearchChange} value={searchTerm} />
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id} className="recipe-item">
            <div onClick={() => handleRecipeClick(recipe)}>
              <h2 className="recipes-name">{recipe.name}</h2>
            </div>
            {selectedRecipes.find(r => r.id === recipe.id) && (
              <div>
                <div className="ingredients">
                  <h3>Ingredients</h3>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li className="ingredient-item" key={index}>{ingredient.name}</li>
                    ))}
                  </ul>
                </div>
                <div className="instructions">
                  <h3>Instructions</h3>
                  <p>{recipe.instructions}</p>
                </div>
                {recipe.imageUrl && (
                  <div className="recipe-image">
                    <img src={recipe.imageUrl} alt={`Image for ${recipe.name}`} />
                  </div>
                )}
                <button onClick={() => navigate(`/edit/${recipe._id}`)}>Edit</button>
                <button onClick={() => handleDelete(recipe._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
