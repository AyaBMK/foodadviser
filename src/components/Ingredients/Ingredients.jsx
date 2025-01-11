import { FaMinus } from "react-icons/fa";
import "./Ingredients.css";
import toast from "../../assets/toast.webp";

export default function Ingredients({ ingredients, showRemoveButton = false}) {
  if (!ingredients || ingredients.length === 0) {
    return <p>Aucun ingrédient disponible.</p>;
  }

  return (
    <div className="card-ingredient-container">
      {ingredients.map((ingredient, index) => (
        <div className="card-ingredient" key={index}>
          <img
            src={ingredient?.image_url || "https://spoonacular.com/cdn/ingredients_100x100/"+ingredient?.image|| toast}
            alt={ingredient.ingredient_name}
            className="card-image"
          />
          <div className="card-ingredient-content">
            <h3>{ingredient.ingredient_name || ingredient.name}</h3>
            <p>
              {ingredient.amount} {ingredient.unit || ""}
            </p>
            {showRemoveButton && (
              <button className="ingredient-btn">
                <FaMinus />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
  
}
