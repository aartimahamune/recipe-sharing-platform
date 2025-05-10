import express from 'express';
import { createRecipe, deleteRecipe, getRecipe, getRecipeDetail, getRecipes, updateRecipe, uploadRecipeImage } from '../controllers/recipe.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.post('/create', verifyToken, createRecipe);
router.post('/upload-image', verifyToken, upload.single('image'), uploadRecipeImage);
router.delete('/delete/:id', verifyToken, deleteRecipe);
router.post('/update/:id', verifyToken, updateRecipe);
router.get('/get/:id', getRecipe);
router.get('/getRecipe/:id', getRecipeDetail);
router.get('/get', getRecipes);


export default router;
