import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Recipes from './components/Recipes/Recipes'
import Ingredients from './components/Ingredients/Ingredients'
import GlobalUpload from './components/GlobalUpload/GlobalUpload'


function App() {

  return (
    <>   
     <Navbar/>
     <GlobalUpload/>
     <Recipes/>
     <Ingredients/>
     <Footer/>
    </>
  )
}

export default App
