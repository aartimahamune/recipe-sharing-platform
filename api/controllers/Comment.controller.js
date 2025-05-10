import Comment from '../models/comment.model.js';

export const createComment = async (req, res, next) => {
  try {
    const { content, recipeId, userRef } = req.body;

    if (userRef !== req.user.id) {
      return next(
        errorHandler(403, 'You are not allowed to create this comment')
      );
    }

    const newComment = new Comment({
      content,
      recipeId,
      userRef,
    });
    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ recipeId: req.params.recipeId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return next(errorHandler(404, 'Comment not found'));

    if (comment.userRef !== req.user.id)
      return next(errorHandler(403, 'You can only delete your own comment'));

    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json('Comment deleted successfully!');
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return next(errorHandler(404, 'Comment not found'));

    if (comment.userRef !== req.user.id)
      return next(errorHandler(403, 'You can only update your own comment'));

    comment.content = req.body.content;
    await comment.save();
    res.status(200).json('Comment updated successfully!');
  } catch (err) {
    next(err);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};