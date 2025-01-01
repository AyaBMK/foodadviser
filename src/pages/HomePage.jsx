import React from "react";
import Recipes from "../components/Recipes/Recipes";
import TopRecipes from "../components/TopRecipes/TopRecipes";
import SearchBar from "../components/SearchBar/SearchBar";

export default function HomePage() {
  return (
    <>
      <SearchBar/>
      <Recipes limit={4} random={true} />
      <TopRecipes />
    </>
  );
}