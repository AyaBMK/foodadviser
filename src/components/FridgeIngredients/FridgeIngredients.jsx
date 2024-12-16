import fridge from "../../assets/fridge.jpg";
import "./FridgeIngredients.css"
import Ingredients from "../Ingredients/Ingredients";

export default function FridgeIngredients() {
    return (
    
    <div className="fridge-page">
          <div className="photo-section">
          <div className="container"> 
        <h2 className="title-fridge-ingredient">Fridge Photo</h2>
        <img className="img-fridge-photo"
          src="/src/assets/fridge.jpg" 
          alt="Fridge" 
        />
      </div>
          </div>
          <div className="ingredients-section">
            <Ingredients />
          </div>
        </div>
    );
  }
  