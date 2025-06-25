import { getAllArticles } from "../api";
import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      setError(null);
      try {
        const articles = await getAllArticles();
        setArticles(articles);
      } catch (error) {
        setError("Article not found");
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!articles.length) {
    return <p>No articles found</p>;
  }

  return (
    <main>
      <h2>Home Page</h2>
      <section className="article-list">
        <ul>
        {articles.map((article) => (
         <li key={article.article_id}>
          <ArticleCard  article={article} />
        </li> 
        ))}
        </ul>
      </section>
    </main>
  );
}
export default ArticleList;
