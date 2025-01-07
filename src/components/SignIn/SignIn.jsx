import React, { useState } from 'react';
import './SignIn.css'
import { NavLink, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [emailOrPseudo, setEmailOrPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const navigate = useNavigate();


  // Function to get CSRF token from cookies
  const getCSRFToken = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith('csrftoken=')) {
        return cookie.substring('csrftoken='.length);
      }
    }
    return null;
  };

  const handleLogin = async () => {
    const csrfToken = getCSRFToken();  // Récupérer le token CSRF
  
    const response = await fetch('http://localhost:8000/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Type de contenu en JSON
        'X-CSRFToken': csrfToken,  // Ajoutez le token CSRF dans l'en-tête
      },
      body: JSON.stringify({
        emailOrPseudo: emailOrPseudo,  // Récupère le pseudo ou l'email depuis le formulaire
        password: password,
        pseudo:pseudo          // Récupère le mot de passe depuis le formulaire
      }),
      credentials: 'include',  // Assurez-vous que les cookies sont envoyés avec la requête
    });
  
    const data = await response.json();
  
    if (response.ok) {
      navigate('/');
      // Rediriger ou effectuer d'autres actions

    } else {
      alert(data.error || "An error occurred");
    }
  };

  return (
    <div className='mainContainer'>
      <div className='titleContainer'>
        <div>SE CONNECTER</div>
      </div>
      <br />
      <div className='inputContainer'>
        <input
          value={emailOrPseudo}
          onChange={(e) => setEmailOrPseudo(e.target.value)}
          placeholder="Email ou pseudo"
          className='inputBox'
        />
      </div>
      <br />
      <div className='inputContainer'>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className='inputBox'
        />
      </div>
      <br />
      <a>Mot de passe oublié ?</a>
      <div>
        <div className="buttonContainer">
          <input
            className="inputButton"
            type="button"
            value="Se connecter"
            onClick={handleLogin}
          />
          <NavLink to="/register">
            <input
              className="inputButton"
              type="button"
              value="Créer un compte"
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
