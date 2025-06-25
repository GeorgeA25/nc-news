import { formatDate } from "../utils/utils";


function CommentCard({ comment }) {
  const {
    author,
    body,
    votes,
    created_at
  } = comment;


return (
    <article className="comment-card">
      <p>{body}</p>
      <p>By: {author}</p>
      <p>Votes: {votes}</p>
      <p>Posted: {formatDate(created_at)}</p>
    </article>
  );
}

export default CommentCard