import { useState } from "react";
import "../styles/AddRecipe.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AddRecipe() {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    diet: "Vegetarian",
    category: "Breakfast",
    cuisine: "Indian",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // New state for loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async () => {
    if (files.length === 0) {
      alert("Please select an image first!");
      return;
    }

    setIsUploading(true); // Start loading

    const imageData = new FormData();
    imageData.append("image", files[0]);

    try {
      const imageRes = await fetch("/api/recipe/upload-image", {
        method: "POST",
        credentials: "include",
        body: imageData,
      });

      const imageResult = await imageRes.json();

      if (!imageRes.ok) {
        throw new Error(imageResult.message || "Image upload failed");
      }

      setImageUrl(imageResult.imageUrl);
      setUploadSuccess(true);
      alert("Image Uploaded Successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      alert("Please upload the image first!");
      return;
    }

    try {
      const recipeData = {
        ...formData,
        imageUrls: imageUrl,
        userRef: currentUser._id,
      };

      const res = await fetch("/api/recipe/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Recipe creation failed");
      }

      alert("Recipe Added Successfully!");
      navigate(`/recipe-details/${result._id}`);
      setFormData({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        diet: "Vegetarian",
        category: "Breakfast",
        cuisine: "Indian",
      });
      setFiles([]);
      setImageUrl("");
      setUploadSuccess(false);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="recipe-form-container">
      <h2>Add a New Recipe</h2>
      <form className="recipe-form" onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter recipe title"
          required
          value={formData.title}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Write a short description"
          required
          value={formData.description}
          onChange={handleChange}
        />

        <label>Ingredients</label>
        <textarea
          name="ingredients"
          placeholder="List ingredients, separated by commas"
          required
          value={formData.ingredients}
          onChange={handleChange}
        />

        <label>Instructions</label>
        <textarea
          name="instructions"
          placeholder="Write step-by-step instructions"
          required
          value={formData.instructions}
          onChange={handleChange}
        />

        <label>Add Image</label>
        <div className="image-upload">
          <input
            onChange={(e) => setFiles(e.target.files)}
            type="file"
            name="image"
            required
          />
          <button
            type="button"
            onClick={handleImageUpload}
            className="upload-btn"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>

        {/* Image Preview */}
        {files.length > 0 && (
          <div className="current-image">
            <img src={URL.createObjectURL(files[0])} alt="Selected" />
          </div>
        )}

        {uploadSuccess && (
          <p className="upload-success">Image Uploaded Successfully!</p>
        )}

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snacks & Appetizers</option>
          <option>Dessert</option>
          <option>Beverage</option>
          <option>Salad</option>
          <option>Soup</option>
          <option>Side Dish</option>
          <option>Rice & Pulao</option>
          <option>Street Food</option>
          <option>Festive Special</option>
        </select>
        <label>Diet Preference</label>
        <select
          name="diet"
          value={formData.diet}
          onChange={handleChange}
        >
          <option>Vegetarian</option>
          <option>Non-Vegetarian</option>
        </select>
        <label>Cuisine</label>
        <select
          name="cuisine"
          value={formData.cuisine}
          onChange={handleChange}
        >
          <option>Indian</option>
          <option>Italian</option>
          <option>French</option>
          <option>Chinese</option>
          <option>Maxican</option>
          <option>Continental</option>
        </select>
        <button type="submit" className="submit-btn" disabled={!uploadSuccess}>
          ADD RECIPE
        </button>
      </form>
    </div>
  );
}
