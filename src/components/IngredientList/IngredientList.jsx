import React, {useContext, useState, useEffect} from 'react'
import { AppContext } from '../../context/AppContext';
import './IngredientList.css'
import toast from "../../assets/toast.webp";
import { getIngredientImgSrc } from "../../utils/img";

export default function IngredientList({addOrRemoveIng, confirmedIngredients}) {
  const { sharedVariable} = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 
  const [addedIngrediendList, setAddedIngredient]= useState([])
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredIngredients, setFilteredIngredients] = useState([]);


  useEffect(() => {
    setAddedIngredient(confirmedIngredients || []);
  }, [confirmedIngredients]);

  useEffect(() => {
    const filtered = sharedVariable.filter(ingredient => 
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredIngredients(filtered);
  }, [searchTerm, sharedVariable]);


  //nb pages 
  const totalPages = Math.ceil(filteredIngredients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentIngredients = filteredIngredients.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const toggleIngredient = (ingredient) => {
    if (addedIngrediendList.some((ing) => ing.name === ingredient.name)) {
      setAddedIngredient((prevList) => prevList.filter((ing) => ing.name !== ingredient.name));
    } else {
      setAddedIngredient((prevList) => [...prevList, ingredient]);
    }
  };
  const sendngredientList = () => {
    addOrRemoveIng(addedIngrediendList); //return ing to parent 
  }

  return (
    <div className="ingredients-container">
       <div className="search-bar-fridge">
        <input
          type="text"
          placeholder="Rechercher un ingrédient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
    <div className="ingredients-grid">
      {currentIngredients.map((ingredient, index) => (
        <div key={index} className="ingredient-card">
          <h3 className="ingredient-name">{ingredient.name}</h3>
          <img
            src={getIngredientImgSrc(ingredient) || undefined}
            alt={ingredient.name}
            className="card-image-lsting"
          />
          <button className="ingredient-action" onClick={() => toggleIngredient(ingredient)}>
          {addedIngrediendList.some((ing) => ing.name === ingredient.name)
                ? "Retirer"
                : "Ajouter"}
          </button>
        </div>
      ))}
    </div>
    <div>
      <button className='btn-added' onClick={sendngredientList}>Confirmer</button>
    </div>
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        precedent
      </button>
      <span>
        Page {currentPage} / {totalPages}
      </span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        suivante
      </button>
    </div>
  </div>
);
}