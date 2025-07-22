import { formatDate } from "../../utils/utils";

function CommentCard({ comment, onDelete, deleting, selectedUser }) {
  const { author, body, votes, created_at } = comment;

  const isAuthor = comment.author === selectedUser;

  return (
    <article className="comment-card">
      <p>{body}</p>
      <p>By: {author}</p>
      <p>Votes: {votes}</p>
      <p>Posted: {formatDate(created_at)}</p>
      {isAuthor && (
        <button
          onClick={() => onDelete(comment.comment_id)}
          disabled={deleting}
        >
          {deleting ? "Deleting ..." : "Delete"}
        </button>
      )}
    </article>
  );
}

export default CommentCard;
