import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./FridgeIngredients.css";
import Ingredients from "../Ingredients/Ingredients";
import { AppContext } from '../../context/AppContext';
import { categorizedIng } from "../../utils/ingredientsUtils";
import { getRecipesSuggestionList } from "../../services/api";
import Recipes from "../Recipes/Recipes";
import { useIngredients } from '../../context/IngredientsContext';
import PopUp from "../Popup/PopUp";

export default function FridgeIngredients() {
  const location = useLocation();
  const { ingredients: ctxIngredients } = useIngredients();
  // 1) Ingrédients d’entrée : d’abord ceux passés par navigate, sinon context
  const baseIngredients = useMemo(
    () => (location.state?.ingredients ?? ctxIngredients ?? []),
    [location.state?.ingredients, ctxIngredients]
  );

  const { sharedVariable, loading, error, setInFridge, setToShop, fridgeImage } = useContext(AppContext);

  const [categorized, setCategorized] = useState({ inFridge: [], toBuy: [] });
  const [recipes, setRecipes] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // --- util
  const namesKey = useMemo(
    () => baseIngredients.map(i => (typeof i === "string" ? i : i?.name || "")).filter(Boolean).map(s => s.toLowerCase()).sort().join("|"),
    [baseIngredients]
  );
  const lastInFridgeKeyRef = useRef("");

  // 2) Catégoriser une seule fois par changement réel d’entrée
  useEffect(() => {
    if (loading || error) return;
    const result = categorizedIng(sharedVariable, baseIngredients);
    setCategorized(prev => {
      const newKey = result.inFridge.map(i => i.name?.toLowerCase() || "").sort().join("|");
      const prevKey = prev.inFridge.map(i => i.name?.toLowerCase() || "").sort().join("|");
      if (newKey === prevKey) return prev; // évite rerenders inutiles
      return result;
    });
  }, [loading, error, sharedVariable, namesKey]); // <- clé stable

  const togglePopup = () => setIsPopupOpen(x => !x);

  const handlePopupList = (addedIngredientList) => {
    setCategorized((current) => {
      const updatedInFridge = addedIngredientList
        .reduce((acc, ing) => {
          const name = (ing?.name || "").trim();
          if (name && !acc.some(x => x.name === name)) acc.push({ name });
          return acc;
        }, []);
      return { ...current, inFridge: updatedInFridge };
    });
    togglePopup();
  };

  // 3) Fetch recettes UNE SEULE FOIS par changement réel d’inFridge
  useEffect(() => {
    const inf = categorized.inFridge;
    if (!inf || inf.length === 0) return;

    const currentKey = inf.map(i => i.name?.toLowerCase() || "").sort().join("|");
    if (currentKey === lastInFridgeKeyRef.current) return; // déjà fetch
    lastInFridgeKeyRef.current = currentKey;

    (async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const data = await getRecipesSuggestionList(inf, 8);
        if (data?.error) setFetchError(data.error);
        else setRecipes(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err?.response) {
          setFetchError(`Erreur serveur : ${err.response.status} - ${err.response.data?.error || "Erreur inconnue"}`);
        } else if (err?.request) {
          setFetchError("Erreur : Impossible de joindre le serveur.");
        } else {
          setFetchError(`Erreur de requête : ${err.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    })();

    // Met à jour AppContext SEULEMENT si ça change vraiment (évite boucle)
    setInFridge(prev => {
      const prevKey = (prev || []).map(i => i.name?.toLowerCase() || "").sort().join("|");
      if (prevKey === currentKey) return prev;
      return inf;
    });
    setToShop(prev => {
      // à toi d’ajuster si tu veux synchroniser aussi toBuy ; sinon commente.
      return categorized.toBuy;
    });
  }, [categorized.inFridge, categorized.toBuy, setInFridge, setToShop]);

  if (loading) return <div>Chargement...</div>;

  return (
    <>
      <div className="fridge-page">
        <div className="photo-section">
          <div className="container">
            <h2>Photo de votre frigo</h2>
            {fridgeImage ? (
              <img src={fridgeImage} alt="Fridge contents" className="img-fridge-photo" />
            ) : (
              <p>Aucune image disponible.</p>
            )}
          </div>
        </div>

        <div className="ingredients-section">
          {fetchError ? (
            <div className="error">Erreur : {fetchError}</div>
          ) : (
            <>
              <h2>Vous avez comme ingrédient :</h2>
              <Ingredients ingredients={categorized.inFridge} />
            </>
          )}
          <div>
            <button className='btn-added' onClick={togglePopup}>
              Modifier la liste des ingrédients
            </button>
            <PopUp
              isOpen={isPopupOpen}
              close={togglePopup}
              onSubmit={handlePopupList}
              confirmedIngredients={categorized.inFridge}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : categorized.inFridge.length > 0 ? (
        <Recipes listRecipes={recipes} previousPage="recipesSuggestion" />
      ) : (
        <div>Impossible de faire une suggestion de recette sans ingrédient</div>
      )}
    </>
  );
}
