import React, { useEffect, useState } from 'react';
import '../styles/MyRecipes.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function MyRecipes() {
  const { currentUser } = useSelector((state) => state.user);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`/api/user/recipes/${currentUser._id}`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
          setRecipes(data);
        } else {
          console.error(data.message || 'Failed to fetch recipes');
        }
      } catch (err) {
        console.error('Error fetching recipes:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [currentUser]);

  const handleRecipeDelete = async (recipeId) => {
    try {
      const res = await fetch(`/api/recipe/delete/${recipeId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="my-recipes-container">
      <h2>My Recipes</h2>

      {loading ? (
        <p className='loading'>Loading...</p>
      ) : recipes.length > 0 ? (
        <table className="recipes-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Title</th>
              <th>Category</th>
              <th>Diet Preference</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe, index) => (
              <tr key={recipe._id}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/recipe-details/${recipe._id}`}>{recipe.title}</Link>
                </td>
                <td>{recipe.category}</td>
                <td>{recipe.diet}</td> {/* Diet Preference */}
                <td>
                  <Link to={`/update-recipe/${recipe._id}`}>
                    <button className="update-btn">Edit</button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleRecipeDelete(recipe._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='loading'>No recipes found!</p>
      )}
    </div>
  );
}
