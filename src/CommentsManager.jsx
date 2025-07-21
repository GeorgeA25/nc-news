import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { deleteCommentById, getCommentsById, getUsers } from "../api";
import CommentForm from "./CommentForm";

function CommentManager({ article_id }) {
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userLoadError, setUserLoadError] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [commentPostSuccessMessage, setCommentPostSuccessMessage] =
    useState(null);
  const [commentPostErrorMessage, setCommentPostErrorMessage] = useState(null);
  const [deleteLoading, setDeletingLoading] = useState(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState(null);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState(null);

  useEffect(() => {
    async function fetchCommentsById() {
      setCommentsLoading(true);
      setCommentsError(null);
      try {
        const commentData = await getCommentsById(article_id);
        setComments(commentData);
      } catch (error) {
        setCommentsError("Failed to load comments by id");
      } finally {
        setCommentsLoading(false);
      }
    }
    fetchCommentsById();
  }, [article_id]);

  useEffect(() => {
    async function fetchUsers() {
      setUserLoading(true);
      setUserLoadError(null);
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (error) {
        setUserLoadError("Failed to load users");
      } finally {
        setUserLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    if (id === "user-select") {
      setSelectedUser(value);
    } else if (id === "comment-input") {
      setCommentInput(value);
    }
  };

  const addComment = (newComment) => {
    setComments((currentComments) => [newComment, ...currentComments]);
    setCommentPostSuccessMessage("Comment posted successfully");
    setCommentPostErrorMessage(null);
    setTimeout(() => setCommentPostSuccessMessage(null), 5000);
  };

  const handleCommentPostError = (error) => {
    setCommentPostErrorMessage(
      "Failed to post comment. Please try again",
      error
    );
    setCommentPostSuccessMessage(null);
    setTimeout(() => setCommentPostErrorMessage(null), 5000);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      setDeletingLoading(commentId);
      await deleteCommentById(commentId);
      setComments((currentComments) => {
        return currentComments.filter(
          (comment) => comment.comment_id !== commentId
        );
      });
      setDeleteSuccessMessage(" Your comment has been successfully deleted");
      setDeleteErrorMessage(null);
      setTimeout(() => setDeleteSuccessMessage(null), 5000);
    } catch (errro) {
      setDeleteErrorMessage("Failed to delete your comment");
      setDeleteSuccessMessage(null);
    } finally {
      setDeletingLoading(null);
    }
  };

  return (
    <>
      <section>
        <h3>Post a comment</h3>
        <section className="user-selector">
          <label htmlFor="user-select">Choose User</label>
          <select
            id="user-select"
            value={selectedUser}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              {" "}
              Select a user
            </option>
            {users.map(({ username }) => (
              <option key={username} value={username}>
                {username}
              </option>
            ))}
          </select>
        </section>
        <section className="comment-form-section">
          {!userLoading && !userLoadError && (
            <CommentForm
              article_id={article_id}
              users={users}
              addComment={addComment}
              onPostError={handleCommentPostError}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          )}
        </section>{" "}
        <section className="post-and-error-messages">
          {commentPostSuccessMessage && <p>{commentPostSuccessMessage}</p>}
          {commentPostErrorMessage && <p>{commentPostErrorMessage}</p>}
          {deleteSuccessMessage && <p>{deleteSuccessMessage}</p>}
          {deleteErrorMessage && <p>{deleteErrorMessage}</p>}
        </section>
        {commentsLoading ? (
          <p> Loading comments ...</p>
        ) : commentsError ? (
          <p>{commentsError}</p>
        ) : comments.length === 0 ? (
          <p>No comments yet </p>
        ) : (
          <>
            <h3>Comments </h3>
            <section className="comments-list">
              <ul>
                {comments.map((comment) => (
                  <li key={comment.comment_id}>
                    <CommentCard
                      comment={comment}
                      onDelete={handleDeleteComment}
                      deleting={deleteLoading === comment.comment_id}
                      selectedUser={selectedUser}
                    />
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
        <section className="user-loading-error">
          {userLoading && <p>Loading users ...</p>}
          {userLoadError && <p>{userLoadError}</p>}
        </section>
      </section>
    </>
  );
}

export default CommentManager;
