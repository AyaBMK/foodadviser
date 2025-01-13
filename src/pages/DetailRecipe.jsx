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


  const { setToShop, ingToShop, setInFridge, ingInFridge} = useContext(AppContext);
  const [localIngInFridge, setLocalIngInFridge] = useState(ingInFridge || []);
  const [localEnrichedIngredients, setLocalEnrichedIngredients] = useState([]);

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
        const data_ingredient= (data?.ingredients || data?.extendedIngredients)
        if (missedIng.length > 0 && data_ingredient.length > 0 ) {
          const enriched = await mapMissedIngredients(missedIng, data_ingredient);
          setLocalEnrichedIngredients(enriched);
        }
      } catch (err) {
        setError("Erreur de connexion au serveur");
        console.log(err)
      }
    };

    fetchRecipeDetailsWithIngredients();
  }, []);

  const moveToShoppingList = (ingredient) => {
    setLocalIngInFridge((prev) => prev.filter((item) => item !== ingredient));
    setLocalEnrichedIngredients((prev) => [...prev, ingredient]);
    //set context variables 
    setInFridge(localIngInFridge)
  };

  const moveToFridge = (ingredient) => {
    setLocalEnrichedIngredients((prev) => prev.filter((item) => item !== ingredient));
    setLocalIngInFridge((prev) => [...prev, ingredient]);
    //set context variables 
    setInFridge(localIngInFridge)
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!recipeDetails) {
    return <p>Chargement des détails de la recette...</p>;
  }

  const ingredients = recipeDetails.ingredients || recipeDetails.extendedIngredients || []
  const steps = recipeDetails?.steps || recipeDetails?.analyzedInstructions[0].steps || [];  

    return (
        <div className="container">
          <h2>{recipeDetails.title}</h2>
          <img
            src={recipeDetails.image_url || recipeDetails.image }
            alt={recipeDetails.title}
            className="recipe-image"
          /> 
          <h3 className="titlee">Ingrédients </h3>
          <Ingredients ingredients={ingredients} showRemoveButton={false} />
          {isSuggestionPage && (
            <>
              <h3 className="titlee">Ingrédients dans le Frigo</h3>
              <Ingredients ingredients={localIngInFridge} showRemoveButton={true} onMoveIngredient={moveToShoppingList}/>
              <h3 className="titlee">Liste de course</h3>
              <Ingredients ingredients={localEnrichedIngredients} showRemoveButton={true} onMoveIngredient={moveToFridge}/>
            </>
      )}
      <h3 className="titlee">Étapes </h3>
      <RecipeSteps steps={steps} />
    </div>
  );
}
