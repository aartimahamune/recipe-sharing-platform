import { Link } from "react-router-dom";
import "../styles/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [vegRecipes, setVegRecipes] = useState([]);
  const [nonVegRecipes, setNonVegRecipes] = useState([]);
  const navigate = useNavigate();

  const handleSeeMore = (dietType) => {
    navigate(`/search?diet=${dietType}`);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const featuredRecipes = [
    {
      id: 1,
      image: "pasta.jpg",
      title: "Delicious Pasta",
    },
    {
      id: 2,
      image: "salad.jpg",
      title: "Healthy Salad",
    },
    {
      id: 3,
      image: "desert.jpg",
      title: "Tasty Dessert",
    },
  ];

  const fetchRecipes = async (params, start = 0, replace = false) => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams({
        ...params,
        startIndex: start,
      }).toString();

      const res = await fetch(`/api/recipe/get?${queryParams}`);
      const data = await res.json();

      if (data.length < 9) {
        setShowMore(false);
      } else {
        setShowMore(true);
      }

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

  useEffect(() => {
    fetchRecipes({}, 0, true);
    fetchVegRecipes();
    fetchNonVegRecipes();
  }, []);
  const fetchVegRecipes = async () => {
    try {
      const res = await fetch(`/api/recipe/get?diet=Vegetarian&startIndex=0`);
      const data = await res.json();
      setVegRecipes(data.slice(0, 4));
    } catch (err) {
      console.error("Error fetching vegetarian recipes:", err);
    }
  };

  const fetchNonVegRecipes = async () => {
    try {
      const res = await fetch(
        `/api/recipe/get?diet=Non-Vegetarian&startIndex=0`
      );
      const data = await res.json();
      setNonVegRecipes(data.slice(0, 4));
    } catch (err) {
      console.error("Error fetching non-vegetarian recipes:", err);
    }
  };

  return (
    <div className="home-container">
      {/* Carousel Section */}
      <section className="carousel-container">
        <Slider {...sliderSettings}>
          {featuredRecipes.map((recipe) => (
            <div key={recipe.id} className="carousel-slide">
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
            </div>
          ))}
        </Slider>
      </section>

      {/* Featured Recipes Section */}
      {/* Featured Recipes Section */}
      <section className="featured-recipes">
        <h2 className="section-title">🔥 Must-Try Recipes! 🔥</h2>
        <div className="results-list">
          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : recipes.length === 0 ? (
            <p className="no-listing">No recipes found!</p>
          ) : (
            <div className="recipe-card-container">
              <RecipeCard recipes={recipes.slice(0, 4)} />
            </div>
          )}
        </div>

        {/* See More Button */}
        {recipes.length > 4 && (
          <div className="see-more-container">
            <Link to="/search" className="see-more-button">
              See More Recipes
            </Link>
          </div>
        )}
      </section>
      {/* Vegetarian Recipes Section */}
      <section className="featured-recipes">
        <h2 className="section-title">🥗 Wholesome Vegetarian Delights 🥗</h2>
        <div className="results-list">
          {vegRecipes.length === 0 ? (
            <p className="no-listing">No vegetarian recipes found!</p>
          ) : (
            <div className="recipe-card-container">
              <RecipeCard recipes={vegRecipes} />
            </div>
          )}
        </div>
        <div className="see-more-container">
  <button
    className="see-more-button"
    onClick={() => handleSeeMore("Vegetarian")}
  >
    See More Vegetarian Recipes
  </button>
</div>
      </section>

      {/* Non-Vegetarian Recipes Section */}
      <section className="featured-recipes">
        <h2 className="section-title">🍗 Flavorful Non-Vegetarian Feasts 🍗</h2>
        <div className="results-list">
          {nonVegRecipes.length === 0 ? (
            <p className="no-listing">No non-vegetarian recipes found!</p>
          ) : (
            <div className="recipe-card-container">
              <RecipeCard recipes={nonVegRecipes} />
            </div>
          )}
        </div>
        <div className="see-more-container">
  <button
    className="see-more-button"
    onClick={() => handleSeeMore("Non-Vegetarian")}
  >
    See More Non-Vegetarian Recipes
  </button>
</div>
      </section>
    </div>
  );
};

export default Home;
