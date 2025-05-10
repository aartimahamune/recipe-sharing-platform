import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/RecipeDetails.css';
import Comment from '../components/Comment';
import CommentSection from '../components/CommentSection';

export default function RecipeDetails() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`/api/recipe/getRecipe/${recipeId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (loading) {
    return <div style={{textAlign : 'center'}} className="recipe-details-container">Loading...</div>;
  }

  if (error) {
    return <div className="recipe-details-container">Error: {error}</div>;
  }

  return (
    <div className="recipe-details-container">
      <div className="recipe-image">
        <img src={recipe.imageUrls} alt={recipe.title} />
      </div>
      <h2 className="recipe-title">{recipe.title}</h2>
      <p className="recipe-category">
        <span>{recipe.diet}</span>
      </p>
      <p className="recipe-description">{recipe.description}</p>

      <div className="recipe-section">
        <h3>Ingredients</h3>
        <ul>
          {recipe.ingredients.split(',').map((ingredient, index) => (
            <li key={index}>{ingredient.trim()}</li>
          ))}
        </ul>
      </div>

      <div className="recipe-section">
        <h3>Instructions</h3>
        <ol>
          {recipe.instructions.split('.').map((instruction, index) => (
            instruction.trim() && <li key={index}>{instruction.trim()}.</li>
          ))}
        </ol>
      </div>
      <CommentSection recipeId={recipeId} />
      
    </div>
  );
}
