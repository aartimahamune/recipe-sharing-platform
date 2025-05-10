import React, { useEffect, useState } from "react";
import "../styles/Comment.css";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import TimeAgo from "react-timeago";

export default function Comment({ comment, onLike, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [user, setUser] = useState({});
  const [isLiked, setIsLiked] = useState(false); // NEW
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userRef}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment.userRef]);

  useEffect(() => {
    if (currentUser && comment.likes) {
      // Check if current user has liked
      setIsLiked(comment.likes.includes(currentUser._id));
    }
  }, [currentUser, comment.likes]);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    onLike(comment._id);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/update-comment/${comment._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: editedContent }),
      });
      if (res.ok) {
        setIsEditing(false);
        onUpdate(comment._id, editedContent);
      }
    } catch (error) {
      console.error("Failed to update comment", error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/comment/delete-comment/${comment._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        onDelete(comment._id);
      }
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  return (
    <div className="recipe-comment-container">
      <div className="recipe-comment-avatar">
        <img
          className="recipe-comment-avatar-img"
          src={user.avatar || "/default-avatar.png"}
          alt="avatar"
        />
      </div>
      <div className="recipe-comment-content">
        <div className="recipe-comment-header">
          <span className="recipe-comment-username">
            @{user.username || "username"}
          </span>
          <span className="recipe-comment-time">
            <TimeAgo date={comment.createdAt} live={false} />
          </span>
        </div>

        {isEditing ? (
          <>
            <textarea
              className="recipe-comment-textarea"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="recipe-comment-edit-buttons">
              <button className="recipe-save-btn" onClick={handleSave}>
                Save
              </button>
              <button
                className="recipe-cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="recipe-comment-text">{comment.content}</p>
            <div className="recipe-comment-actions">
              <button
                onClick={handleLike}
                className={`recipe-like-btn ${isLiked ? "liked" : ""}`}
              >
                <FaThumbsUp className="recipe-thumb-icon" />
                <span> {comment.likes.length} likes</span>
              </button>
              {currentUser && currentUser._id === comment.userRef && (
                <>
                  <button
                    className="recipe-edit-btn"
                    onClick={() => {
                      setIsEditing(true);
                      setEditedContent(comment.content);
                    }}
                  >
                    Edit
                  </button>
                  <button className="recipe-delete-btn" onClick={handleDelete}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
