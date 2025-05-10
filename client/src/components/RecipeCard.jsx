import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RecipeCard.css';

export default function RecipeCard({ recipes }) {
  return (
    <div className="recipe-card-container">
      {recipes && recipes.length > 0 ? (
        recipes.map((recipe) => (
          <Link key={recipe._id} to={`/recipe-details/${recipe._id}`}>
            <div className="recipe-card">
              <img src={recipe.imageUrls} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
}
