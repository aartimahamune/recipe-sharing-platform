import Recipe from "../models/recipe.model.js";
import { errorHandler } from "../utils/error.js";

export const createRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.create(req.body);
    return res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

export const uploadRecipeImage = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }
    const imageUrl = req.file.path;
    res.status(200).json({ imageUrl });
  } catch (err) {
    next(err);
  }
};

export const deleteRecipe = async (req, res, next) =>
  {
      const recipe = await Recipe.findById(req.params.id);
  
      if(!recipe)
      {
          return next(errorHandler(404, 'Recipe not found!'));
      }
      if(req.user.id !== recipe.userRef)
      {
          return next(errorHandler(401, 'You can only delete your own recipe!'));
      }
      try {
          await Recipe.findByIdAndDelete(req.params.id);
          res.status(200).json('Recipe has been deleted successfully!');
      } catch (error) {
          next(error);
      }
  }

  export const updateRecipe = async (req, res, next) => {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    if (req.user.id !== recipe.userRef) {
      return next(errorHandler(401, 'You can only update your own listings!'));
    }
  
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedRecipe);
    } catch (error) {
      next(error);
    }
  };

  export const getRecipe = async (req, res, next) =>{
    try {
      const recipe = await Recipe.findById(req.params.id);
      if(!recipe)
      {
        return next(errorHandler(404, 'Listing not found!'));
      }
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }

  export const getRecipeDetail = async (req, res, next) =>{
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      res.status(200).json(recipe);
    } catch (error) {
      next(error)
    }
  };

  export const getRecipes = async (req, res, next) => {
    try {
      const { searchTerm, category, cuisine, diet, sort_order, startIndex } = req.query;
      let query = {};
  
      // Search by title
      if (searchTerm) {
        query.title = { $regex: searchTerm, $options: "i" };
      }
  
      // Filter by category
      if (category) {
        query.category = category;
      }
  
      // Filter by cuisine
      if (cuisine) {
        query.cuisine = cuisine;
      }
  
      // Filter by diet
      if (diet) {
        query.diet = diet;
      }
  
      // Sorting
      let sortOption = { createdAt: -1 }; // Default newest to oldest
      if (sort_order === "oldest") {
        sortOption = { createdAt: 1 };
      }
  
      // Pagination: skip & limit
      const start = parseInt(startIndex) || 0; // default 0
      const limit = 9; // 9 recipes per page
  
      const recipes = await Recipe.find(query)
        .sort(sortOption)
        .skip(start)
        .limit(limit);
  
      res.status(200).json(recipes);
    } catch (error) {
      next(error);
    }
  };
  