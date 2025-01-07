import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/api";
import Ingredients from "../components/Ingredients/Ingredients.jsx";
import RecipeSteps from "../components/RecipeSteps/RecipeSteps.jsx";
import "../styles/DetailRecipe.css";

export default function DetailRecipe() {
  const { recipeId } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const data = await getRecipeById(recipeId);
        if (data.error) {
          setError(data.error);
        } else {
          setRecipeDetails(data);
        }
      } catch (err) {
        console.error("Error fetching recipe:", err.message);
        setError("Erreur de connexion au serveur");
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!recipeDetails) {
    return <p>Chargement des détails de la recette...</p>;
  }

  const ingredients = recipeDetails.ingredients || [];
  const steps = recipeDetails.steps || [];

  return (
    <div className="container">
      <h2>{recipeDetails.title}</h2>
      <img
        src={recipeDetails.image_url || "default_image_url.jpg"}
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
