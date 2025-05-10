import express from 'express';
import { createComment, getPostComments, deleteComment, updateComment, likeComment } from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create-comment', verifyToken, createComment);
router.get('/getPostComments/:recipeId', getPostComments);
router.delete('/delete-comment/:id', verifyToken, deleteComment);
router.put('/update-comment/:id', verifyToken, updateComment);
router.put('/update-comment/:id', verifyToken, updateComment);
router.put('/like-comment/:commentId', verifyToken, likeComment);


export default router;
