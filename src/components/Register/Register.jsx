import React from 'react';
import './Register.css';
import { NavLink } from 'react-router-dom';

export default function Register() {
  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>S'INSCRIRE</div>
      </div>
      <br />
      
      <div className="inputContainer">
        <input
          placeholder="Email"
          className="inputBox"
        />
      </div>
      <br />

      <div className="inputContainer">
        <input
          placeholder="Pseudo"
          className="inputBox"
        />
      </div>
      <br />

      <div className="inputContainer">
        <input
          type="password"
          placeholder="Mot de passe"
          className="inputBox"
        />
      </div>
      <br />

      <div className="inputContainer">
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          className="inputBox"
        />
      </div>
      <br />

      <div className="inputContainer">
        <p>Date de naissance</p>
        <input
          type="date"
          className="inputBox dateInput"
        />
      </div>
      <br />
      <div className="genderContainer">
        <button className="genderButton">Femme</button>
        <button className="genderButton">Homme</button>
      </div>

      <br />
      <div className="buttonContainer">
        <input
          className="inputButton"
          type="button"
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
    </div>
  );
}
