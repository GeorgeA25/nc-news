import { useParams } from "react-router-dom";
import { getArticleByTopic, getEmojiReactionsByArticleId } from "../api/api";
import { useEffect, useState } from "react";
import ArticleCard from "../Cards/ArticleCard";

function TopicDetails() {
  const [articles, setArticles] = useState([]);
  const [emojiReactions, setEmojiReactions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    async function fetchArticleByTopic() {
      setLoading(true);
      setError(null);
      try {
        const articleData = await getArticleByTopic(slug);
        setArticles(articleData);
        const emojis = {};
        for (const article of articleData) {
          const emojiReactions = await getEmojiReactionsByArticleId(
            article.article_id
          );
          emojis[article.article_id] = emojiReactions;
        }
        setEmojiReactions(emojis);
      } catch (error) {
        setError("Failed to load articles for this topic");
      } finally {
        setLoading(false);
      }
    }
    fetchArticleByTopic();
  }, [slug]);

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!articles.length) {
    return (
      <p>
        {" "}
        Topic "{slug}"No article found on topic {slug}
      </p>
    );
  }

  return (
    <>
      <main>
        <h2>Articles on {slug}</h2>
        <section className="article-list">
          {articles.map((article) => (
            <ArticleCard
              key={article.article_id}
              article={article}
              emojiCount={emojiReactions[article.article_id].length}
            />
          ))}
        </section>
      </main>
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

export default TopicDetails;
