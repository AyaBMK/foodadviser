import React, { useState } from 'react';
import './Register.css';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Register() {
  // Utilisation de useState pour gérer les valeurs des champs de formulaire
  const [email, setEmail] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');  // Champ pour le genre

  const navigate = useNavigate();

  // Fonction pour gérer le changement des champs du formulaire
 const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation de base des champs
  if (password !== confirmPassword) {
    alert('Les mots de passe ne correspondent pas');
    return;
  }

  const userData = {
    email,
    pseudo,
    password,
    birthdate,
    gender,  // Inclure le genre dans les données envoyées
  };

  try {
    // Récupérer le token CSRF à partir des cookies
    const csrftoken = document.cookie.match(/csrftoken=([\w-]+)/)?.[1];
    console.log(csrftoken);  // Check if the CSRF token is retrieved

    const response = await fetch('http://127.0.0.1:8000/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,  // Ajouter le token CSRF
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Inscription réussie');
      navigate('/signin');
    } else {
      alert(data.message || 'Erreur d\'inscription');
    }
  } catch (error) {
    console.error('Erreur:', error);
    alert('Une erreur est survenue. Veuillez réessayer.');
  }
};


  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>S'INSCRIRE</div>
      </div>
      <br />

      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <input
            type="email"
            placeholder="Email"
            className="inputBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <br />

        <div className="inputContainer">
          <input
            type="text"
            placeholder="Pseudo"
            className="inputBox"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
        </div>
        <br />

        <div className="inputContainer">
          <input
            type="password"
            placeholder="Mot de passe"
            className="inputBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />

        <div className="inputContainer">
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            className="inputBox"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <br />

        <div className="inputContainer">
          <p>Date de naissance</p>
          <input
            type="date"
            className="inputBox dateInput"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
          />
        </div>
        <br />

        <div className="genderContainer">
          <button type="button" className="genderButton" onClick={() => setGender('M')}>Homme</button>
          <button type="button" className="genderButton" onClick={() => setGender('F')}>Femme</button>
        </div>

        <br />
        <div className="buttonContainer">
          <input
            className="inputButton"
            type="submit"
            value="Je m'inscris"
          />
          <NavLink to={"/signin"}>
            <input
              className="inputButton-Sgn"
              type="button"
              value="Je me connecte"
            />
          </NavLink>
        </div>
      </form>
    </div>
  );
}