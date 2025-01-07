import { useContext, useEffect, useState } from "react";
import fridge from "../../assets/fridge.jpg";
import "./FridgeIngredients.css"
import Ingredients from "../Ingredients/Ingredients";
import { AppContext } from '../../context/AppContext';
import { categorizeIngredients, categorizedIng } from "../../utils/ingredientsUtils";
import {getRecipesSuggestionList} from "../../services/api"
import Recipes from "../Recipes/Recipes";
import { data } from "react-router-dom";

export default function FridgeIngredients() {

  const { sharedVariable, loading, error, setToShop, setInFridge } = useContext(AppContext);
  const [categorized, setCategorized] = useState({ inFridge: [], toBuy: [] });
  const [recipes, setRecipes] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  //ingredient in fridge 
  //must be returned from backend 
  // const ingIA = [
  //   { name: "peppers" },
  //   { name: "salmon" },
  //   { name: "lime" },
  //   {name: "cabbage"}, 
  //   {name: "spinach leaves"},
  //   {name: "parsnip"},
  //   {name: "olives"}, 
  //   {name: "chilies"}, 
  //   {name: "plum tomatoes"}, 
  //   {name: "potatoes"}, 
  //   {name: "eggs"},
  //   {name: "braggs liquid aminos"},
  //   {name: "sweet potatoes"},
  //   {name: "a squirt sriracha"},
  //   {name: "block lite tofu"},
  //   {name: "rocket leaves"},
  //   {name: "grapeseed oil"},
  //   {name: "chorizo"},
  //   {name: "vegetables"},
  //   {name: "beef short ribs"},
  //   {name: "seasoning"},
  //   {name: "greens"},
  //   {name: "ground beef"},
  //   {name: "herbs de provence"},
  //   {name: "lemon"},
  //   {name: "short"},
  // ];  
  const ingIA = [
    
      {name: "chorizo"},
      {name: "a squirt sriracha"},
     {name: "block lite tofu"},
     {name: "rocket leaves"},
     {name: "lemon"},
      ]; 
  useEffect(() => {
    if (!loading && !error) {
      const result = categorizedIng(sharedVariable, ingIA);
      setCategorized(result);
    }
  }, [sharedVariable, loading, error]); 
  
  useEffect(() => {
    if (categorized.inFridge.length > 0) {
      const fetchRecipes = async () => {
        try {
          const data = await getRecipesSuggestionList(
            categorized.inFridge.map((ing) => ing.name)
          );
          if (data.error) {
            setFetchError(data.error);  
          } else {
            setRecipes(data);  
          }
        } catch (err) {
          // Axios returned value 
          if (err.response) {
            setFetchError(`Erreur serveur : ${err.response.status} - ${err.response.data.error || "Erreur inconnue"}`);
          } else if (err.request) {
            setFetchError("Erreur : Impossible de joindre le serveur.");
          } else {
            setFetchError(`Erreur de requête : ${err.message}`);
          }
        }
        finally {
          setIsLoading(false)
        }
      };
  
      fetchRecipes();
      setInFridge(categorized.inFridge)
      setToShop(categorized.toBuy)
    }
  }, [categorized]);
  

  return (
    <>
    <div className="fridge-page">

          <div className="photo-section">
          <div className="container"> 
        <h2 className="title-fridge-ingredient">Fridge Photo</h2>
        <img className="img-fridge-photo"
          src="/src/assets/fridge.jpg" 
          alt="Fridge" 
        />
      </div>
          </div>
          <div className="ingredients-section">
            {loading ? (
              <div className="loading">Chargement...</div>
            ) : error ? (
              <div className="error">Erreur : {error.message}</div>
            ) : (
              <>
                <h2>Vous avez comme ingrédient : </h2>
                <Ingredients ingredients={categorized.inFridge}/>
              </>
             
            )}
          </div>
        
        </div>
        {isLoading ? (
            <div>Chargement des recettes...</div>
          ) : (
            <Recipes listRecipes={recipes} previousPage='recipesSuggestion' />
          )}

          
   </>
        
    );
  }
  