import { FaMinus } from "react-icons/fa";
import orange from "../../assets/orange.jpg";
import "./Ingredients.css";


export default function Ingredients() {
    const ingredients = [
        { id: 1, title: "Orange", image: orange },
        { id: 2, title: "Orange", image: orange },
        { id: 3, title: "Orange", image: orange },
        { id: 4, title: "Orange", image: orange },
        { id: 1, title: "Orange", image: orange },
        { id: 2, title: "Orange", image: orange },
        { id: 3, title: "Orange", image: orange },
        { id: 4, title: "Orange", image: orange },
      ];
      const groupedIngredients = [];
      for (let i = 0; i < ingredients.length; i += 3) {
        groupedIngredients.push(ingredients.slice(i, i + 3));
      }
  return (
    <>
        <div className="container">
            <h2 className="title-ingredients">Vous avez comme ingrédients :</h2>
            {groupedIngredients.map((group, index) => (
        <div key={index} style={{ display: "flex", gap: "20px" }}>
          {group.map((ingredient, idx) => (
                <div className="card-ingredient" key={`${index}-${idx}`}>
                    <img src={ingredient.image} alt="" className="card-image"/>
                    <div className="card-ingredient-content">
                        <h3>{ingredient.title}</h3>
                        <button className="ingredient-btn"><FaMinus /></button>
                    </div>
                </div> 
                ))}
                </div>
              ))}
            </div>
    </>
  )
}