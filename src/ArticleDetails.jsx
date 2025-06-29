import { useParams } from "react-router-dom";
import { getArticleById, patchArticleVotes } from "../api";
import { useEffect, useState } from "react";
import { formatDate } from "../utils/utils";
import CommentManager from "./CommentsManager";

function ArticleDetails() {
  const [article, setArticle] = useState(null);
  const [articleLoading, setArticleLoading] = useState(true);
  const [articleError, setArticleError] = useState(null);
  const { article_id } = useParams();
  const [votesCount, setVotesCount] = useState(0);
  const [votesCountError, setVotesCountError] = useState(null);
  const [votesSuccessMessage, setVotesSuccessMessage] = useState(null);
  const [isVoteLoading, setIsVoteLoading] = useState(false);

  useEffect(() => {
    async function fetchArticleById() {
      setArticleLoading(true);
      setArticleError(null);
      try {
        const articleData = await getArticleById(article_id);
        setArticle(articleData);
        setVotesCount(articleData.votes);
      } catch (error) {
        setArticleError("Failed to load article or comments");
      } finally {
        setArticleLoading(false);
      }
    }
    fetchArticleById();
  }, [article_id]);

  if (articleLoading) {
    return <p>Loading ...</p>;
  }

  if (articleError) {
    return <p>{articleError}</p>;
  }

  if (!article) {
    return <p>No article found on {article_id}</p>;
  }

  const {
    title,
    author,
    topic,
    body,
    comment_count,
    votes,
    created_at,
    article_img_url,
  } = article;

  const handleVote = async (inc_votes) => {
    if (isVoteLoading) return;
    setIsVoteLoading(true);

    setVotesCount((currentCount) => currentCount + inc_votes);
    setVotesCountError(null);
    setVotesSuccessMessage(null);
    try {
      await patchArticleVotes(article_id, inc_votes);
      setVotesSuccessMessage("Your vote was successfully submitted!");
      setTimeout(() => setVotesSuccessMessage(null), 5000);
    } catch (error) {
      setVotesCount((currentCount) => currentCount - inc_votes);
      setVotesCountError("Failed to submit your vote, Please try again");
    } finally {
      setIsVoteLoading(false);
    }
  };

  return (
    <>
      <section className="article-details">
        <h2>{title}</h2>
        <img
          src={article_img_url}
          alt={`Image for article titled "${title}"`}
        />
        <p>Body: {body}</p>
        <p>Author: {author}</p>
        <p>Topic: {topic}</p>
        <p>Comments: {comment_count}</p>
        <p>Votes: {votesCount}</p>
        <button disabled={isVoteLoading} onClick={() => handleVote(1)}>
          Upvote
        </button>
        <button disabled={isVoteLoading} onClick={() => handleVote(-1)}>
          Downvote
        </button>
        {votesCountError && <p className="error">{votesCountError}</p>}
        {votesSuccessMessage && (
          <p className="success">{votesSuccessMessage}</p>
        )}
        <p>Published: {formatDate(created_at)}</p>
      </section>
      <section>
        <CommentManager article_id={article_id} />
      </section>
      <footer>
        <button
          className="back-to-top-button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to Top
        </button>
      </footer>
    </>
  );
}

export default ArticleDetails;
