import React from "react";
import "./RecipeSteps.css";

export default function RecipeSteps({ steps }) {
  if (!steps || steps.length === 0) {
    return <p>Aucune étape trouvée.</p>;
  }

  return (
    <div className="container">
      <div className="recipe-step-list">
        {steps.map((item, index) => (
          <div key={index} className="recipe-step-list__container">
            <div className="recipe-step-list__head">
              <span>Étape {item.number || index + 1}</span>
            </div>
            <p>{item.step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}