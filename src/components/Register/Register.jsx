import React, {useState} from 'react';
import './Register.css';
import { useNavigate, NavLink } from "react-router-dom";
import { api } from "../../services/api";
import { checkPasswordStrength } from "../../utils/password";

export default function Register() {
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
   
  if (!email || !pseudo || !password || !confirmPassword || !birthdate || !gender) {
    setError("Veuillez remplir tous les champs.");
    return;
  }
  
  if (password !== confirmPassword) {
    setError("Les mots de passe ne correspondent pas.");
    return;
  }

  const { ok, message } = checkPasswordStrength(password);
  if (!ok) {
    setError(message);
    return;
  }

  // ...
  try {
      const { data } = await api.post(`/users/register/`, {
        email,
        username: pseudo,
        password,
        birthdate,
        gender,
      });
      setSuccess("Inscription réussie !");
      setError("");
      setTimeout(() => navigate("/signin"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue.");
    }
  };

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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br />

      <div className="inputContainer">
        <input
          placeholder="Pseudo"
          className="inputBox"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
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
        />
      </div>
      <br />
      <div className="genderContainer">
        <button 
        className={`genderButton ${gender === "Femme" ? "selected" : ""}`}
        onClick={() => setGender("Femme")}
        >
          Femme
        </button>
        <button className={`genderButton ${gender === "Homme" ? "selected" : ""}`}
          onClick={() => setGender("Homme")}>
            Homme
        </button>
      </div>

      <br />
      {error && <p className="errorLabel">{error}</p>}
      {success && <p className="successLabel">{success}</p>}

      <div className="buttonContainer">
        <input
          className="inputButton"
          type="button"
          value="Je m'inscris"
          onClick={handleRegister}
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
