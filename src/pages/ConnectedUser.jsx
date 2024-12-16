// src/pages/HomePage.jsx
import React from 'react';
import Navbar from '../components/Navbar/Navbar';  // Importation du composant Navbar
import GlobalUpload from "../components/GlobalUpload/GlobalUpload"

import TopRecipes from "../components/TopRecipes/TopRecipes"
import Footer from '../components/Footer/Footer';  // Importation du composant Footer

const ConnectedUser = () => {
  return (
    <div>
      <GlobalUpload />
      <TopRecipes />
    </div>
  );
};

export default ConnectedUser;