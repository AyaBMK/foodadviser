import { useRef, useContext, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import logo from "../../assets/foodAdviser_logo.png";
import { NavLink } from "react-router-dom"
import LogoutButton from "../LogoutButton/LogoutButton";
import authService from "../../services/authentication_service";
import { AuthContext } from "../../context/AuthContext";
import {AppContext} from "../../context/AppContext"; 
import jsPDF from "jspdf";
import "jspdf-autotable";
 


function Navbar() {
	const navRef = useRef();
	const { isLoggedIn, user } = useContext(AuthContext);
  	const { userIngToShop} = useContext(AppContext);
	console.log("User Connecté : ", isLoggedIn)

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};
	  const downloadShoppingList = () => {
		const doc = new jsPDF();
		doc.text("Liste de course", 10, 10);
		const filteredIngredients = userIngToShop.filter((ingredient) => {
		  const ingredientName = ingredient.name || ingredient.ingredient_name;
		  return ingredientName && !ingredientName.toLowerCase().includes("ingrédient inconnu");
		});
		
	
		if (filteredIngredients.length > 0) {
		  const rows = filteredIngredients.map((ingredient) => [
			ingredient.name || ingredient.ingredient_name,
		  ]);
		  console.log("rows : ", rows)
		  doc.autoTable({
			head: [["Ingrédient"]],
			body: rows,
		  });
		} else {
		  doc.text("Aucun ingrédient dans la liste de course.", 10, 30);
		}
	
		doc.save("liste_de_course.pdf");
	  };

	return (
		<header>
			<div className="logo-container">
            <img src={logo} alt="Logo" className="logo"/>
			</div>
			<nav ref={navRef}>
				<div className="nav-links">
					<NavLink to={"/"} className="a">Accueil</NavLink>
					<NavLink to={"/recipes"} className="a">Recettes</NavLink>
					<NavLink to={"/toprecipes"} className="a">Les meilleurs recettes</NavLink>
				</div>
				<div className="connexion-container">
				{isLoggedIn ? (
					<>						
						{/* <button onClick={downloadShoppingList}>Telecharger la liste</button> */}
						<LogoutButton />
					</>
					) : (
						<NavLink to={"/signin"}>
						<button>Connexion</button>
						</NavLink>
					)}
				</div>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}
				>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}
			>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;
