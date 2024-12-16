import toast from "../../assets/toast.webp";
import "./Recipes.css";
import orange from "../../assets/orange.jpg";

export default function Recipes() {
  return (
    <>
     <div className="container">
        <h2 className="title-recipes">Nos recettes</h2>
        <div className="card-container">
            <div className="card card-recipe">
                <img src={toast} alt=""/>
                <div className="card-content">
                    <h3>Toasts à la crème de saumon fumé</h3>
                </div>
            </div> 
            <div className="card card-recipe">
                <img src={toast} alt=""/>
                <div className="card-content">
                    <h3>Toasts à la crème de saumon fumé</h3>
                </div>
            </div> 
            <div className="card card-recipe">
                <img src={toast} alt=""/>
                <div className="card-content">
                    <h3>Toasts à la crème de saumon fumé</h3>
                </div>
            </div> 
            <div className="card card-recipe">
                <img src={toast} alt=""/>
                <div className="card-content">
                    <h3>Toasts à la crème de saumon fumé</h3>
                </div>
            </div> 
        </div>
     </div>
    </>
  )
}