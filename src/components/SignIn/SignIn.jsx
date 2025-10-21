import React , {useState, useContext} from 'react'
import './SignIn.css'
import { useNavigate, NavLink } from "react-router-dom"
import authService from "../../services/authentication_service";
import { AuthContext } from "../../context/AuthContext";


export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const handleSubmit = async () => {
    try {
      const user = await authService.login(username, password); 
      login(user)
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mainContainer">
    <div className="titleContainer">
      <div>SE CONNECTER</div>
    </div>
    <br />
    <div className="inputContainer">
      <input
        value={username}
        placeholder="Pseudo"
        onChange={(e) => setUsername(e.target.value)}
        className="inputBox"
      />
    </div>
    <br />
    <div className="inputContainer">
      <input
        type="password"
        value={password}
        placeholder="Mot de passe"
        onChange={(e) => setPassword(e.target.value)}
        className="inputBox"
      />
    </div>
    <br />
    <a href="#">Mot de passe oublié ?</a>
    {error && <p className="errorLabel">{error}</p>}
    <div>
      <div className="buttonContainer">
        <input
          className="inputButton"
          type="button"
          value="Se connecter"
          onClick={handleSubmit}
        />
        <NavLink to={"/register"}>
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
