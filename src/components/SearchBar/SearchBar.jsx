// src/components/SearchBar.jsx
import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Recherche:", query);  // Logique de recherche (exemple)
    // Vous pouvez ajouter ici la logique pour effectuer une recherche dans vos données
  };

  return (
    <div className="searchbar-container">
      <p className="searchbar-text">On mange quoi aujourd'hui?</p> {/* Texte au-dessus de la searchbar */}
      <p>Ne vous posez plus jamais cette question ! Avec FoodAdviser, 
        prenez une photo de vos ingrédients et découvrez des recettes adaptées à vos envies alimentaires.</p>
      <form onSubmit={handleSearch} className="searchbar-form">
        <input
          type="text"
          placeholder="Rechercher..."
          value={query}
          onChange={handleInputChange}
          className="searchbar-input"
        />
        <button type="submit" className="searchbar-button">Rechercher</button>
      </form>
    </div>
  );
};

export default SearchBar;
