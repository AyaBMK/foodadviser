import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { getRecipeById, viewRecipe } from "../services/api"; // Import de la nouvelle fonction
import Ingredients from "../components/Ingredients/Ingredients.jsx";
import RecipeSteps from "../components/RecipeSteps/RecipeSteps.jsx";
import "../styles/DetailRecipe.css";
import { useLocation } from "react-router-dom";
import { categorizeIngredients } from "../utils/ingredientsUtils";
import {mapMissedIngredients} from "../utils/ingredientsUtils.jsx"
import jsPDF from "jspdf";
import "jspdf-autotable";
import authService from "../services/authentication_service.jsx";

export default function DetailRecipe() {
  const { recipeId } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const fromPage = params.get("from");
  const missedIng = params.get("missedIng")
    ? JSON.parse(params.get("missedIng"))
    : [];


  let isSuggestionPage = fromPage.includes('recipesSuggestion')


  const { setuserIngToShop, userIngToShop, setInFridge, ingInFridge} = useContext(AppContext);
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
          return;
        }
        
        setRecipeDetails(data);
        
        if (authService.isAuthenticated()) {
          await viewRecipe(data.title);
        } else {
          console.log("Utilisateur non connecté : pas d'enregistrement des recettes consultées.");
        }
        
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
  }, [recipeId]); 

  const moveToShoppingList = (ingredient) => {
    setLocalIngInFridge((prev) => prev.filter((item) => item !== ingredient));
    setLocalEnrichedIngredients((prev) => [...prev, ingredient]);
    setInFridge(localIngInFridge)
  };

  const moveToFridge = (ingredient) => {
    setLocalEnrichedIngredients((prev) => prev.filter((item) => item !== ingredient));
    setLocalIngInFridge((prev) => [...prev, ingredient]);
    setInFridge(localIngInFridge)
  };

  const downloadShoppingList = () => {
    const doc = new jsPDF();
    doc.text("Liste de course", 10, 10);
    const filteredIngredients = localEnrichedIngredients.filter((ingredient) => {
      const ingredientName = ingredient.name || ingredient.ingredient_name;
      return ingredientName && !ingredientName.toLowerCase().includes("ingrédient inconnu");
    });
    

    if (filteredIngredients.length > 0) {
      const rows = filteredIngredients.map((ingredient) => [
        ingredient.name || ingredient.ingredient_name,
      ]);
      console.log("rows : ", rows)
      doc.autoTable({
        head: [["Ingrédient"]],
        body: rows,
      });
    } else {
      doc.text("Aucun ingrédient dans la liste de course.", 10, 30);
    }

    doc.save("liste_de_course.pdf");
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!recipeDetails) {
    return <div className="loading-spinner marginn"></div>;
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
              { localEnrichedIngredients.length > 0 && (
                <>
                  <button
                    style={{
                      backgroundColor: "#45AA6D",
                      color: "white",
                      padding: "10px 20px",
                      textAlign: "center",
                      textDecoration: "none",
                      display: "inline-block",
                      fontSize: "16px",
                      margin: "10px 0",
                      cursor: "pointer",
                      border: "none",
                      borderRadius: "5px",
                    }}
                    onClick={downloadShoppingList}
                  >
                    Télécharger
                  </button>

                  {/* <button
                    style={{
                      backgroundColor: "#45AA6D",
                      color: "white",
                      padding: "10px 20px",
                      textAlign: "center",
                      textDecoration: "none",
                      display: "inline-block",
                      fontSize: "16px",
                      margin: "10px 10px",
                      cursor: "pointer",
                      border: "none",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      setuserIngToShop((prevUserIngToShop) => {
                        const updatedList = [...prevUserIngToShop, ...localEnrichedIngredients];
                        alert("Ingrédients ajoutés à la liste de courses !");
                        return updatedList; 
                      });
                    }}
                  >
                    Ajouter à la liste de courses
                  </button> */}
                </>
              )}
            </>
      )}
      <h3 className="titlee">Étapes </h3>
      <RecipeSteps steps={steps} />
    </div>
  );
}
