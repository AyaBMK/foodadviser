import React, { useEffect, useState } from 'react';
import './TopRecipes.css';
import authService from '../../services/authentication_service';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';

export default function TopRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = authService.getAccessToken();
      if (!token) { setLoading(false); return; }

      try {
        const { data } = await api.post(`/recommandations/recommend_recipes/`, {});
        setRecipes(data.recommended_recipes || []);
      } catch (err) {
        console.error(err);
        setError('Impossible de récupérer les recommandations.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) return <div className="loading-spinner"></div>;
  if (!authService.getAccessToken()) return null;

  return (
    <div className="container">
      <h2>Top Recettes</h2>
      {error && <p className="errorLabel">{error}</p>}
      <div className="card-container">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div className="card-topRecipes" key={recipe.id}>
              <img src={recipe.image} alt={recipe.title} />
              <div className="description-topRecipes">
                <Link
                  to={{
                    pathname: `/recipes/${recipe.id}`,
                    search: `?from=TopRecipes&missedIng=${encodeURIComponent(JSON.stringify(recipe.missedIngredients || []))}`,
                  }}>
                  <h3 className="cardTitle-topRecipes">{recipe.title}</h3>
                  <p className="text-muted">Nombre de personnes : {recipe.servings || "Non spécifié"}</p>
                  <p className="text-muted">
                    Résumé : {recipe.summary ? (recipe.summary.length > 200 ? `${recipe.summary.substring(0, 150)}...` : recipe.summary) : "Aucun résumé disponible."}
                  </p>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>Aucune recommandation disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
}
