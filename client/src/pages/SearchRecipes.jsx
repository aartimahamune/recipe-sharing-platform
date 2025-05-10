import React, { useEffect, useState } from "react";
import "../styles/SearchRecipes.css";
import { useLocation, useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

export default function SearchRecipes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  // Controlled form states
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // State to track current index for pagination
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParams = {};
    for (const [key, value] of params.entries()) {
      searchParams[key] = value;
    }

    // Fill filters from URL
    setSearchTerm(searchParams.searchTerm || "");
    setCategory(searchParams.category || "");
    setCuisine(searchParams.cuisine || "");
    setDiet(searchParams.diet || "");
    setSortOrder(searchParams.sort_order || "newest");

    // Reset startIndex when filters change
    setStartIndex(0);
    fetchRecipes(searchParams, 0, true);
  }, [location.search]);

  
  const fetchRecipes = async (params, start = 0, replace = false) => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams({
        ...params,
        startIndex: start,
      }).toString();

      const res = await fetch(`/api/recipe/get?${queryParams}`);
      const data = await res.json();

      // If less than 9 recipes returned, disable Show More
      if (data.length < 9) {
        setShowMore(false);
      } else {
        setShowMore(true);
      }

      // Replace or append recipes
      if (replace) {
        setRecipes(data);
      } else {
        setRecipes((prev) => [...prev, ...data]);
      }
    } catch (err) {
      console.error("Error fetching recipes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      searchTerm,
      category,
      cuisine,
      diet,
      sort_order: sortOrder,
    }).toString();
    navigate(`/search?${query}`);
  };

  const onShowMoreClick = () => {
    const nextIndex = startIndex + 9;
    const params = new URLSearchParams(location.search);
    const searchParams = {};
    for (const [key, value] of params.entries()) {
      searchParams[key] = value;
    }
    fetchRecipes(searchParams, nextIndex, false);
    setStartIndex(nextIndex);
  };

  return (
    <div className="search-container">
      <div className="search-sidebar">
        <form className="search-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Search Term:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select
              className="select-field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Snacks & Appetizers">Snacks & Appetizers</option>
              <option value="Dinner">Dinner</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
              <option value="Salad">Salad</option>
              <option value="Soup">Soup</option>
              <option value="Side Dish">Side Dish</option>
              <option value="Rice & Pulao">Rice & Pulao</option>
              <option value="Street Food">Street Food</option>
              <option value="Festive Special">Festive Special</option>
            </select>
          </div>

          <div className="form-group">
            <label>Cuisine:</label>
            <select
              className="select-field"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            >
              <option value="">Select Cuisine</option>
              <option value="Indian">Indian</option>
              <option value="Italian">Italian</option>
              <option value="French">French</option>
              <option value="Chinese">Chinese</option>
              <option value="Mexican">Mexican</option>
              <option value="Continental">Continental</option>
            </select>
          </div>

          <div className="form-group">
            <label>Dietary Preferences:</label>
            <div className="checkbox-group">
              <input
                type="checkbox"
                checked={diet === "Vegetarian"}
                onChange={() =>
                  setDiet(diet === "Vegetarian" ? "" : "Vegetarian")
                }
              />
              <span>Vegetarian</span>
            </div>
            <div className="checkbox-group">
              <input
                type="checkbox"
                checked={diet === "Non-Vegetarian"}
                onChange={() =>
                  setDiet(diet === "Non-Vegetarian" ? "" : "Non-Vegetarian")
                }
              />
              <span>Non-Vegetarian</span>
            </div>
          </div>

          <div className="form-group">
            <label>Sort:</label>
            <select
              className="select-field"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest to Oldest</option>
              <option value="oldest">Oldest to Newest</option>
            </select>
          </div>

          <button className="submit-btn">Search</button>
        </form>
      </div>

      <div className="search-results">
        <h1 className="results-heading">Recipe results:</h1>
        <div className="results-list">
          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : recipes.length === 0 ? (
            <p className="no-listing">No recipes found!</p>
          ) : (
            <RecipeCard recipes={recipes} />
          )}
          {showMore && !loading && (
            <div className="show-more">
              <button className="show-more-btn" onClick={onShowMoreClick}>Show more</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
