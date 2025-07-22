import { useState } from "react";
import { postCommentToArticle } from "../api/api";

function CommentForm({ article_id, addComment, onPostError, selectedUser }) {
  const [commentInput, setCommentInput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newComment = await postCommentToArticle(article_id, {
        username: selectedUser,
        body: commentInput,
      });
      addComment(newComment);
      setCommentInput("");
    } catch (error) {
      onPostError("Failed to post comment");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment-input">Your Comment:</label>
      <textarea
        id="comment-input"
        placeholder="Please write comment"
        value={commentInput}
        onChange={(event) => setCommentInput(event.target.value)}
        maxLength={100}
      />
      {!commentInput.trim() && <p>Please write a comment</p>}
      <button type="submit" disabled={!selectedUser || !commentInput.trim()}>
        Add Comment
      </button>
    </form>
  );
}

export default CommentForm;
