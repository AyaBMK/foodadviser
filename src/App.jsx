import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Recipes from './components/Recipes/Recipes'
import Ingredients from './components/Ingredients/Ingredients'
import recipeData from './components/IngredientSection/recipe.json';
import IngredientSection from './components/IngredientSection/IngredientSection'

function App() {

  return (
    <>
     <Navbar/>
     <Recipes/>
     <Ingredients/>
     <div>
      <IngredientSection title="Ingrédients :" ingredients={recipeData.extendedIngredients} type="recipe" />
      {/* <IngredientSection title="Déjà dans le frigo" listIng={fridgeIngredients} type="fridge" />
      <IngredientSection title="Liste de courses" listIng={toBuyIngredients} type="toBuy" /> */}
    </div>
     <Footer/>
    </>
  )
}

export default App
