import React from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function IngredientSection({title, ingredients, type}) {
  return (
    <div>
      <div className='container'>
      <h2>{title}</h2>
      <div className="card-container">
      {ingredients.map((ingredient, index) => (
        <div key={index} className="card">
          <img
            src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
            alt={ingredient.name}
            className="card-image-lst"
          />
          <div className="card-content">
            <h3>{ingredient.name}</h3>
            <p>Quantité : {ingredient.amount} {ingredient.unit}</p>
            {type === 'recipe' && (
              <button className="ingredient-btn">
                <FaPlus /> 
              </button>
            )}
            {type === 'fridge' && (
              <button className="ingredient-btn">
                <FaMinus /> 
              </button>
            )}
          </div>
        </div>
      ))}
      </div>
    </div>
    </div>
  )
}
