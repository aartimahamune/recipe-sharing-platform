import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import AddRecipe from "./pages/AddRecipe";
import MyRecipes from "./pages/MyRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import UpdateRecipe from "./pages/UpdateRecipe";
import SearchRecipes from "./pages/SearchRecipes";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path='/update-recipe/:recipeId' element={<UpdateRecipe />} />
        </Route>
        <Route path='/recipe-details/:recipeId' element={<RecipeDetails />} />
        <Route path='/search' element={<SearchRecipes />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
