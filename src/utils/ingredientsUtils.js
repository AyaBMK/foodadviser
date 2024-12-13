export function categorizeIngredients(recipeIngredients, fridgeIngredients) {
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
  