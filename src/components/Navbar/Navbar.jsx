import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import logo from "../../assets/foodAdviser_logo.png";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Suivi de l'état de connexion
  const [user, setUser] = useState(null);  // Stockage des informations de l'utilisateur
  const navigate = useNavigate();

  // Afficher/masquer le menu mobile
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  // Vérification si l'utilisateur est connecté lors du chargement du composant
  useEffect(() => {
    const storedUser = localStorage.getItem("user");  // Récupérer les données utilisateur stockées dans localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser));  // Si des données utilisateur existent, les stocker dans l'état
      setIsLoggedIn(true);  // L'utilisateur est connecté
    }
  }, []);  // Appelé une seule fois lors du chargement du composant

  // Fonction pour obtenir le token CSRF depuis les cookies
  const getCSRFToken = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
	  console.log(cookie);
      if (cookie.startsWith('csrfoken=')) {
        return cookie.substring('csrfoken='.length);  // Retourne le token CSRF
      }
    }
    return null;  // Aucun token trouvé
  };

  // Fonction de déconnexion
  const handleLogout = async () => {
    const csrfToken = getCSRFToken();  // Récupérer le token CSRF
	console.log("mon Token est :", csrfToken);
    if (!csrfToken) {
      console.error("Token CSRF manquant");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,  // Ajoutez le token CSRF dans l'en-tête
        },
        credentials: "include",  // Inclure les cookies de session
      });
	  if (!response){
		console.log("la réponse est :", response);
	  }
      const data = await response.json();
      console.log("Réponse de déconnexion:", data);

      if (response.ok) {
        // Si la déconnexion est réussie, effacer les données localStorage et l'état
        localStorage.removeItem("user");
        setIsLoggedIn(false);  // L'utilisateur n'est plus connecté
        setUser(null);  // Réinitialiser les informations utilisateur
        navigate("/");  // Rediriger vers la page d'accueil après déconnexion
      } else {
        alert("Erreur lors de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <header>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <nav ref={navRef}>
        <div className="nav-links">
          <NavLink to={"/"} className="a">Accueil</NavLink>
          <NavLink to={"/recipes"} className="a">Recettes</NavLink>
          <NavLink to={"/toprecipes"} className="a">Les meilleures recettes</NavLink>
        </div>
        <div className="connexion-container">
          {/* Affichage conditionnel du bouton */}
          {isLoggedIn ? (
            <>
              <span className="user-name">{user.pseudo}</span> {/* Affiche le pseudo de l'utilisateur */}
              <button onClick={handleLogout}>Déconnexion</button>  {/* Bouton de déconnexion */}
            </>
          ) : (
            <NavLink to={"/signin"}>
              <button>Connexion</button>  {/* Bouton de connexion */}
            </NavLink>
          )}
        </div>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
