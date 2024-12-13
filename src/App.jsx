import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Recipes from './components/Recipes/Recipes'
import Ingredients from './components/Ingredients/Ingredients'
import ImageUpload from './components/ImageUpload'
import CameraCapture from './components/CameraCapture'
import SearchBar from './components/SearchBar'

import backgroundImage from './assets/1557910681-12914.webp'; // Adaptez le chemin à votre fichier
import GlobalUpload from './components/GlobalUpload/GlobalUpload'


function App() {

  return (
    <>   
     <Navbar/>
     <GlobalUpload/>
     <Recipes/>
     <Ingredients/>
     <Footer/>

     
    <Footer/>
    </>
  )
}

export default App
