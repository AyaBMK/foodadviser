import React, { useState } from 'react';
import { getRecipesAutocomplete } from "../../services/api"; 
import toast from "../../assets/toast.webp";
import { Link } from "react-router-dom";
import './SearchBar.css';
import { CiSearch } from "react-icons/ci";
import { ImSpinner11 } from "react-icons/im";

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [noResults, setNoResults] = useState(false); 

  const handleSearch = async (e) => {
    e.preventDefault(); 
    if (!query) return;

    setLoading(true); 
    setNoResults(false); 
    setSuggestions([]);

    try {
      const data = await getRecipesAutocomplete(query);
      if (!data.error) {
        if (data.length === 0) {
          setNoResults(true); 
        } else {
          setSuggestions(data);
        }
      } else {
        console.error('Erreur lors de la récupération des suggestions :', data.error);
      }
    } catch (error) {
      console.error('Erreur réseau ou autre:', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') { 
      handleSearch(e);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setNoResults(false); 
  };


  return (
    <>
      <div className="search-bar-container">
        <h1 className="search-container-title">On mange quoi Aujourd’hui ?</h1>
        <form className="search-bar" onSubmit={handleSearch}>
          <CiSearch className="search-bar-icon" />
          <input
            type="text"
            placeholder="Recherche..."
            value={query}
            onChange={handleChange} 
            onKeyDown={handleKeyPress}
            className="search-bar-input"
          />
        </form>
        {loading && (
          <div className="spinner"><ImSpinner11 /> Recherche...</div> 
        )}
        {noResults && !loading && (
            <p>Aucune recette trouvée pour "<strong>{query}</strong>". Essayez un autre terme.</p>
        )}

        {suggestions.length > 0 && !loading && (
          <div className="card-container container">
            {suggestions.map((suggestion) => {
              return (
                <div key={suggestion.id} className="card card-recipe">
                  <img src={suggestion.image_url} alt={suggestion.title || "Recette"} />
                  <div className="card-content">
                    <Link to={`/recipes/${suggestion.id}`}>
                      <h3>{suggestion.title}</h3>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );  
}
