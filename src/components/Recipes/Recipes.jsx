import React, { useEffect, useState } from "react";
import { getRecipesList } from "../../services/api"; 
import toast from "../../assets/toast.webp";
import "./Recipes.css";
import { Link } from "react-router-dom";

export default function Recipes({ limit, random, listRecipes=[], previousPage=''}) { 
  const [recipes, setRecipes] = useState([]); 
  const [error, setError] = useState(null);   
  

  if(previousPage.length == 0){
    previousPage='Home'
  }  

  const fetchRecipes = async () => {
    try {
      const data = await getRecipesList(100); 
      if (data.error) {
        setError(data.error);
      } else {
        setRecipes(data.recipes || []); 
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    }
  };

  const getRandomRecipes = (recipes, count) => {
    const shuffled = [...recipes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    // Only fetch if the `displayedRecipes` prop is empty
    if (listRecipes.length === 0 && recipes.length === 0) {
      fetchRecipes();
    }
  }, [listRecipes, recipes]);

  // Determine which recipes to display
  let displayedRecipes = listRecipes.length > 0 ? listRecipes : recipes;


  if (random && limit && recipes.length > 0) {
    displayedRecipes = getRandomRecipes(recipes, limit);
  } else if (limit) {
    displayedRecipes = recipes.slice(0, limit);
  }


  return (
    <div className="container marginr">
      <h2 className="title-recipes">Nos recettes</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="card-container">
        {displayedRecipes.length > 0 ? (
          displayedRecipes.map((recipe, index) => (
            <div key={index} className="card card-recipe">
              <img
                src={recipe.image_url || recipe.image || toast}
                alt={recipe.title || "Recette"}
              />
              <div className="card-content">
                <Link key={recipe.id_recipe} 
                to={{
                  pathname: `/recipes/${recipe.id_recipe || recipe.id}`,
                  search: `?from=${previousPage}&missedIng=${encodeURIComponent(
                    JSON.stringify(recipe.missedIngredients || [])
                  )}`,
                }}>
                  <h3>{recipe.title}</h3>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="loading-spinner"></div>
        )}
      </div>

    </div>
  );
}