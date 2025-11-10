import { FaMinus } from "react-icons/fa";
import "./Ingredients.css";
import { getIngredientImgSrc } from "../../utils/img";

export default function Ingredients({ ingredients, showRemoveButton=false, onMoveIngredient }) {
  if (!ingredients || ingredients.length === 0) return <p>Aucun ingrédient disponible.</p>;

  return (
    <div className="card-ingredient-container">
      {ingredients.map((ingredient, index) => {
        const name = ingredient.ingredient_name || ingredient.name || "";
        const src  = getIngredientImgSrc(ingredient);

        return (
          <div className="card-ingredient" key={`${name}-${index}`}>
            {src ? <img src={src} alt={name} className="card-image" /> : null}
            <div className="card-ingredient-content">
              <h3>{name}</h3>
              {ingredient.amount ? <p>{ingredient.amount} {ingredient.unit || ""}</p> : null}
              {showRemoveButton && (
                <button className="ingredient-btn" onClick={() => onMoveIngredient?.(ingredient)}>
                  <FaMinus />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
