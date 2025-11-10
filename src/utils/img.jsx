// utils/img.js (ou .ts, peu importe)
export function getIngredientImgSrc(ing) {
  const url  = ing?.image_url;       // URL absolue depuis ta BDD
  const file = ing?.image;           // Spoonacular: filename OU parfois URL

  // 1) Priorité à l'URL BDD si présente
  if (url) return url;

  // 2) Si on a `image`:
  if (file) {
    // si c’est déjà une URL, on la renvoie telle quelle
    if (file.startsWith('http') || file.startsWith('/')) return file;
    // sinon on fabrique l’URL CDN Spoonacular
    return `https://spoonacular.com/cdn/ingredients_100x100/${file}`;
  }

  // 3) pas d’image exploitable
  return null;
}
