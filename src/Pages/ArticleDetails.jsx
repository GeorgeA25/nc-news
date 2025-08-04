import { useParams } from "react-router-dom";
import {
  getArticleById,
  patchArticleVotes,
  getEmojis,
  postEmojiReactions,
} from "../api/api";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/utils";
import CommentManager from "../Comments/CommentsManager";

function ArticleDetails() {
  const [article, setArticle] = useState(null);
  const [articleLoading, setArticleLoading] = useState(true);
  const [articleError, setArticleError] = useState(null);
  const { article_id } = useParams();
  const [votesCount, setVotesCount] = useState(0);
  const [votesCountError, setVotesCountError] = useState(null);
  const [votesSuccessMessage, setVotesSuccessMessage] = useState(null);
  const [isVoteLoading, setIsVoteLoading] = useState(false);
  const [emojiList, setEmojiList] = useState([]);
  const [emojiError, setEmojiError] = useState(null);
  const [isEmojiLoading, setIsEmojiLoading] = useState(false);
  const [emojiMessage, setEmojiMessage] = useState("");
  const [selectedUser, setSelctedUser] = useState("");

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

  useEffect(() => {
    async function fetchEmojis() {
      try {
        const emojis = await getEmojis();
        setEmojiList(emojis);
      } catch (error) {
        setEmojiError("Failed to load emoji list");
      }
    }
    fetchEmojis();
  }, []);

  const handleEmojiReactions = async (emojiId) => {
    if (isEmojiLoading) return;

    setIsEmojiLoading(true);
    setEmojiError(null);
    setEmojiMessage(null);

    try {
      await postEmojiReactions(emojiId, username, article_id);
      setEmojiMessage("Your emoji reaction was posted");
      setTimeout(() => setEmojiMessage(null), 5000);
    } catch (error) {
      setEmojiError("Failed to post your emoji reaction, Please try again");
      setTimeout(() => setEmojiError(null), 5000);
    } finally {
      setIsEmojiLoading(false);
    }
  };

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
        <section className="emoji-reactions">
          <h3>React with an emoji</h3>
          {emojiError && <p>{emojiError}</p>}
          {emojiMessage && <p>{emojiMessage}</p>}

          <div className="emoji-buttons">
            {emojiList.map(({ emoji_id, emoji_symbol }) => (
              <button
                key={emoji_id}
                disabled={isEmojiLoading}
                onClick={() => handleEmojiReactions(emoji_id)}
                title={emoji_symbol}
              >
                {emoji_symbol}
              </button>
            ))}
          </div>
        </section>
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
