import { getAllArticles } from "../api";
import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { useSearchParams } from "react-router-dom";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState(
    () => searchParams.get("sort_by") || "created_at"
  );
  const [order, setOrder] = useState(() => searchParams.get("order") || "desc");

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      setError(null);
      try {
        const articles = await getAllArticles(sortBy, order);
        setArticles(articles);
      } catch (error) {
        setError("Article not found");
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, [sortBy, order]);

  function handleSortByChange(newSortBy) {
    setSortBy(newSortBy);
    setSearchParams({ sort_by: newSortBy, order });
  }

  function handleOrderChange(newOrder) {
    setOrder(newOrder);
    setSearchParams({ sort_by: sortBy, order: newOrder });
  }

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
    <>
      <main>
        <h2>Home Page</h2>
        <div className="sort-by">
          <section>
            <label htmlFor="sort-by">Sort by</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(event) => handleSortByChange(event.target.value)}
            >
              <option value="created_at">Date</option>
              <option value="comment_count">Comment Count</option>
              <option value="votes">Votes</option>
            </select>
          </section>
          <section>
            <label htmlFor="order">Order</label>
            <select
              id="order"
              value={order}
              onChange={(event) => handleOrderChange(event.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </section>
        </div>
        <section className="article-list">
          <ul>
            {articles.map((article) => (
              <li key={article.article_id}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
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
export default ArticleList;
