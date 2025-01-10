import React, {useState} from "react";
import "./PopUp.css";
import IngredientList from "../ingredientList/IngredientList";

function PopUp({ isOpen, close,onSubmit}) {

  const handleIngredientAdd = (ingredient) => {
    if (onSubmit) {
      onSubmit(ingredient); // send ing to parent 
    }
  };
  return (
    <div className={`popup-overlay ${isOpen ? "open" : ""}`}>
      <div className="popup">
        <div className="popup-header">
          <h2>Ajouter un ingredient:</h2>
          <button onClick={close} className="close-button">Fermer</button>
        </div>
        <div className="popup-content">
          <IngredientList addOrRemoveIng={handleIngredientAdd} />
        </div>
      </div>
    </div>
  );
}

export default PopUp;
