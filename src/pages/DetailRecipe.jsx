import React, { useEffect, useState, useContext } from "react";
import { AppContext } from '../context/AppContext';
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/api";
import Ingredients from "../components/Ingredients/Ingredients.jsx";
import RecipeSteps from "../components/RecipeSteps/RecipeSteps.jsx";
import "../styles/DetailRecipe.css";
import { useLocation } from 'react-router-dom';
import { categorizeIngredients } from "../utils/ingredientsUtils";
import {mapMissedIngredients} from "../utils/ingredientsUtils.jsx"

export default function DetailRecipe() {
  const { recipeId } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const fromPage = params.get('from');
  const missedIng = params.get("missedIng")
  ? JSON.parse(params.get("missedIng"))
  : [];


  let isSuggestionPage = fromPage.includes('recipesSuggestion')
  const [enrichedIngredients, setEnrichedIngredients] = useState([]);


  const { ingToShop, ingInFridge} = useContext(AppContext);

  const [recipeDetails, setRecipeDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetailsWithIngredients = async () => {
      try {
        const data = await getRecipeById(recipeId);
        if (data.error) {
          setError(data.error);
          return 
        } 

        setRecipeDetails(data);
        // Fetch enriched ingredients only if needed
        if (missedIng.length > 0 && data.ingredients.length > 0) {
          const enriched = await mapMissedIngredients(missedIng, data.ingredients);
          setEnrichedIngredients(enriched);
        }
      } catch (err) {
        setError("Erreur de connexion au serveur");
      }
    };

    fetchRecipeDetailsWithIngredients();
  }, []);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!recipeDetails) {
    return <p>Chargement des détails de la recette...</p>;
  }

  const ingredients = recipeDetails.ingredients || []
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
          {isSuggestionPage && (
            <>
              <h3 className="titlee">Ingrédients dans le Frigo</h3>
              <Ingredients ingredients={ingInFridge} />
              <h3 className="titlee">Liste de course</h3>
              <Ingredients ingredients={enrichedIngredients} />
            </>
      )}
      <h3 className="titlee">Étapes </h3>
      <RecipeSteps steps={steps} />
    </div>
  );
}
