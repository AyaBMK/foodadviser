import { get_ingredients_by_id } from "../services/ingredient_service.jsx"; 

export function categorizeIngredients_(recipeIngredients, fridgeIngredients) {
    const inFridge = [];
    const toBuy = [];
  
    recipeIngredients.forEach((recipeIng) => {
      const found = fridgeIngredients.find(
        (fridgeIng) => fridgeIng.name.toLowerCase() === recipeIng.name.toLowerCase()
      );
  
      if (found) {
        inFridge.push(recipeIng); 
      } else {
        toBuy.push(recipeIng); 
      }
    });
  
    return { inFridge, toBuy };
  }

export function categorizeIngredients(recipeIngredients, fridgeIngredients) {
    const normalize = (str) =>
    str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")  
    .trim();  
  
    const inFridge = [];
    const toBuy = [];
  
    recipeIngredients.forEach((recipeIng) => {
      const found = fridgeIngredients.find(
        (fridgeIng) => normalize(fridgeIng.name) === normalize(recipeIng.name)
      );
  
      if (found) {
        inFridge.push(recipeIng);
      } else {
        toBuy.push(recipeIng);
      }
    });
    return { inFridge, toBuy };
}

export function categorizedIng(ingredientsList, fridgeIngredients){
  const normalize = (str) =>
    str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")  
    .trim(); 

  const inFridge = [];
  const toBuy = [];
  ingredientsList.forEach(ingredient => {
    const found = fridgeIngredients.find(
      (fridgeIng) => normalize(fridgeIng.name) === normalize(ingredient.name)
    );
    const alreadyInFridge = inFridge.some(
      (ing) => normalize(ing.name) === normalize(ingredient.name)
    );
    
    if(found && !alreadyInFridge){
      inFridge.push(ingredient)
    }else {
      toBuy.push(ingredient)
    }
  })
  return { inFridge, toBuy }
}
async function fetchIngredientDetails(ingredientId) {
  try {
    const response = await get_ingredients_by_id(ingredientId);
    if (response?.error) throw new Error(response.error);
    return response; // { name, image_url, id_ingredient } (selon ta view)
  } catch {
    return null;
  }
}

// ingredientsUtils.jsx
export async function mapMissedIngredients(missedIng) {
  const enriched = await Promise.all(
    (missedIng || []).map(async (m) => {
      const details = await fetchIngredientDetails(m.id); // renvoie {name, image_url, ...}

      if (details && (details.name || details.image_url)) {
        return {
          id: m.id,
          ingredient_name: details.name,
          image_url: details.image_url || null, // <-- URL absolue si trouvée en BDD
          amount: m.amount,
          unit: m.unit || '',
        };
      }

      // Fallback Spoonacular : on garde le filename (PAS d'URL)
      return {
        id: m.id,
        ingredient_name: m.name || `ingredient ${m.id}`,
        image: m.image || null, // <-- filename
        amount: m.amount,
        unit: m.unit || '',
      };
    })
  );
  return enriched;
}


