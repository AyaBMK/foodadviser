import { FaMinus } from "react-icons/fa";
import "./Ingredients.css";

export default function Ingredients({ ingredients }) {
  if (!ingredients || ingredients.length === 0) {
    return <p>Aucun ingrédient disponible.</p>;
  }

  return (
    <div className="card-ingredient-container">
      {ingredients.map((ingredient, index) => (
        <div className="card-ingredient" key={index}>
          <img
            src={ingredient.image_url || "default_image_url.jpg"}
            alt={ingredient.ingredient_name}
            className="card-image"
          />
          <div className="card-ingredient-content">
            <h3>{ingredient.ingredient_name}</h3>
            <p>
              {ingredient.amount} {ingredient.unit || ""}
            </p>
            <button className="ingredient-btn">
              <FaMinus />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
  
}
