import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Recipes from './components/Recipes/Recipes'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import TopRecipes from './components/TopRecipes/TopRecipes'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import DetailRecipe from "./pages/DetailRecipe";
import FridgeIngredients from './components/FridgeIngredients/FridgeIngredients'

function App() {

  return (
    <div className="app-container">
     <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:recipeId" element={<DetailRecipe />} />
        <Route path="/toprecipes" element={<TopRecipes />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipeSuggestion" element={<FridgeIngredients />} />
      </Routes>
     </BrowserRouter>
     <Footer/>
    </div>
  )
}

export default App