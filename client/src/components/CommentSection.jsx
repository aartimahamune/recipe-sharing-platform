import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import '../styles/CommentSection.css';

export default function CommentSection({ recipeId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${recipeId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    getComments();
  }, [recipeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      setCommentError('Comment exceeds 200 characters.');
      return;
    }

    try {
      const res = await fetch('/api/comment/create-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          recipeId,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setCommentError(data.message || 'Failed to post comment');
        return;
      }

      setComment('');
      setCommentError(null);
      setComments([data, ...comments]); // add new comment to list
    } catch (error) {
      setCommentError(error.message || 'Something went wrong');
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = (commentId) => {
    setComments((prevComments) => prevComments.filter((c) => c._id !== commentId));
  };

  // Handle updating a comment
  const handleUpdateComment = (commentId, newContent) => {
    setComments((prevComments) =>
      prevComments.map((c) =>
        c._id === commentId ? { ...c, content: newContent } : c
      )
    );
  };

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/like-comment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="cs-wrapper">
      <h2 className="cs-heading">Comments</h2>

      {currentUser ? (
        <div className="cs-user-info-section">
          <p className="cs-signed-in-text">Signed in as:</p>
          <div className="cs-user-details">
            <img
              className="cs-user-avatar"
              src={currentUser.avatar || '/default-avatar.png'}
              alt="User Avatar"
            />
            <div className="cs-username-link">@{currentUser.username}</div>
          </div>
        </div>
      ) : (
        <div className="cs-sign-in-prompt">
          <span>You must be signed in to comment.</span>
          <Link className="cs-sign-in-link" to="/sign-in">
            Sign In
          </Link>
        </div>
      )}

      {currentUser && (
        <form onSubmit={handleSubmit} className="cs-form">
          <textarea
            className="cs-textarea"
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></textarea>
          <div className="cs-form-footer">
            <span className="cs-characters">
              {200 - comment.length} characters left
            </span>
            <button type="submit" className="cs-submit-btn">
              Post Comment
            </button>
          </div>
          {commentError && (
            <div className="cs-error-message">{commentError}</div>
          )}
        </form>
      )}

      <div className="comments-count-section">
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet!</p>
        ) : (
          <>
            <div className="comments-count">
              <p className="comments-text">Comments</p>
              <div className="count-badge">
                <p>{comments.length}</p>
              </div>
            </div>
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                onLike={handleLike}
                onDelete={handleDeleteComment}
                onUpdate={handleUpdateComment}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
