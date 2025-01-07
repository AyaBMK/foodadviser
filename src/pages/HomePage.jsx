import React from "react";
import Recipes from "../components/Recipes/Recipes";
import TopRecipes from "../components/TopRecipes/TopRecipes";

export default function HomePage() {
  return (
    <>
      <Recipes limit={4} random={true} />
      <TopRecipes />
    </>
  );
}