import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Recipes from './components/Recipes/Recipes'
import Ingredients from './components/Ingredients/Ingredients'
import GlobalUpload from './components/GlobalUpload/GlobalUpload'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import TopRecipes from './components/TopRecipes/TopRecipes'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import ConnectedUser from './pages/ConnectedUser'


function App() {

  return (
    <>
     <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/toprecipes" element={<TopRecipes />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/connecteduser" element={<ConnectedUser />} />
        </Routes>
     </BrowserRouter>
     <Footer/>
    </>
  )
}

export default App
