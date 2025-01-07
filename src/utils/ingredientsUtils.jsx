export function categorizeIngredients_(recipeIngredients, fridgeIngredients) {
    console.log(recipeIngredients)
    console.log(fridgeIngredients)
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
    console.log(inFridge.length)
    return { inFridge, toBuy };
}
  