import express from 'express';
import { deleteUser, getUser, getUserRecipes, test } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/recipes/:id', verifyToken, getUserRecipes);
router.get('/:userRef', getUser);



export default router;