import { formatDate } from "../utils/utils";

function ArticleCard({ article }) {
  const {
    title,
    author,
    topic,
    comment_count,
    votes,
    created_at,
    article_img_url,
  } = article;

  return (
    <article className="article-card">
      <img src={article_img_url} alt={`Image for article titled "${title}"`} />
      <h3>{title}</h3>
      <p>Author: {author}</p>
      <p>Topic: {topic}</p>
      <p>Comments: {comment_count}</p>
      <p>Votes: {votes}</p>
      <p>Published: {formatDate(created_at)}</p>
    </article>
  );
}

export default ArticleCard;
