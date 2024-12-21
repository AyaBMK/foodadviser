import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/api";
import Ingredients from "../components/Ingredients/Ingredients.jsx"; "../components/Ingredients/Ingredients.jsx"; 
import RecipeSteps from "../components/RecipeSteps/RecipeSteps.jsx"; 
import "../styles/DetailRecipe.css"

export default function DetailRecipe() {
  const { recipeId } = useParams(); 
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [error, setError] = useState(null);

  // Charger les détails de la recette
  const fetchRecipeDetails = async () => {
    try {
      const data = await getRecipeById(recipeId);
      if (data.error) {
        setError(data.error);
      } else {
        setRecipeDetails(data);
      }
    } catch (err) {
    //   setError("Erreur de connexion au serveur");
    console.error('Error fetching recipe:', error.response || error.message);

    }
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, [recipeId]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!recipeDetails) {
    return <p>Chargement des détails de la recette...</p>;
  }

  const groupedIngredients = [];
  for (let i = 0; i < recipeDetails.extendedIngredients.length; i += 4) {
    groupedIngredients.push(recipeDetails.extendedIngredients.slice(i, i + 4));
  }

  // Extraire les ingrédients et les étapes depuis les détails de la recette
  const ingredients = recipeDetails.extendedIngredients || [];
  const steps =
  recipeDetails.analyzedInstructions.length > 0
    ? recipeDetails.analyzedInstructions[0].steps
    : [];
    return (
        <div className="container">
          <h2>{recipeDetails.title}</h2>
          <img
            src={recipeDetails.image || "default_image_url.jpg"}
            alt={recipeDetails.title}
            className="recipe-image"
          /> 
          <h3 className="titlee">Ingrédients </h3>
          <Ingredients ingredients={ingredients} />
          <h3 className="titlee">Étapes </h3>
          <RecipeSteps steps={steps} />
        </div>
      );
    }