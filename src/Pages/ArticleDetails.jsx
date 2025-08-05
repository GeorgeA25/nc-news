import { useParams } from "react-router-dom";
import {
  getArticleById,
  patchArticleVotes,
  getEmojis,
  postEmojiReactions,
  getEmojiReactionsByArticleId,
  getUsers,
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
  const [emojis, setEmojs] = useState([]);
  const [emojiError, setEmojiError] = useState(null);
  const [isEmojiLoading, setIsEmojiLoading] = useState(false);
  const [emojiMessage, setEmojiMessage] = useState("");
  const [selectUser, setSelectUser] = useState("");
  const [users, setUsers] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [userError, setUserError] = useState(null);

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
        setEmojs(emojis);

        const reaction = await getEmojiReactionsByArticleId(article_id);
        setReactions(reaction);
      } catch (error) {
        setEmojiError("Failed to load emoji list");
      }
    }
    fetchEmojis();
  }, [article_id]);

  useEffect(() => {
    async function fecthUsers() {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        setUserError("Failed to load user");
      }
    }
    fecthUsers();
  }, []);

  const handleEmojiReactions = async (emojiId) => {
    if (isEmojiLoading) return;

    if (!selectUser) {
      setEmojiMessage("Please select a user before reacting with an emoji");
      return;
    }

    setIsEmojiLoading(true);
    setEmojiError(null);
    setEmojiMessage(null);

    try {
      await postEmojiReactions(emojiId, selectUser, article_id);

      const newReaction = {
        emoji_id: emojiId,
        username: selectUser,
        article_id: article_id,
      };

      setReactions((currentReactions) => [...currentReactions, newReaction]);
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
        <section className="user-select">
          <h4>Select a user</h4>
          <select
            value={selectUser}
            onChange={(event) => setSelectUser(event.target.value)}
            disabled={isEmojiLoading}
          >
            <option value=""> Select a user</option>
            {users.map((user) => {
              return (
                <option key={user.username} value={user.username}>
                  {user.username}
                </option>
              );
            })}
          </select>
        </section>
        <section className="emoji-reactions">
          <h3>React with an emoji</h3>
          {emojiError && <p>{emojiError}</p>}
          {emojiMessage && <p>{emojiMessage}</p>}

          <div className="emoji-buttons">
            {emojis.map(({ emoji_id, emoji_symbol }) => (
              <button
                key={emoji_id}
                disabled={isEmojiLoading || !selectUser}
                onClick={() => handleEmojiReactions(emoji_id)}
                title={emoji_symbol}
              >
                {emoji_symbol}
              </button>
            ))}
          </div>
        </section>
        <section className="display-reactions">
          <h4>Reactions</h4>
          <div className="reaction-list">
            {reactions && reactions.length > 0 ? (
              reactions.map(({ username, emoji_id, emoji_reactions_id }) => {
                console.log("Reaction data: ", {
                  username,
                  emoji_id,
                  emoji_reactions_id,
                });
                console.log(emojis);
                const emoji = emojis.find(
                  (emoji) => emoji.emoji_id === emoji_id
                );
                const symbol = emoji ? emoji.emoji_symbol : "?";
                return (
                  <div key={`${emoji_reactions_id}`}>
                    <span>{symbol}</span>
                    <span>{username}</span>
                  </div>
                );
              })
            ) : (
              <p>No Reactions yet</p>
            )}
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
