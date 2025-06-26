import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { getTopics } from "../api";

function TopicsList() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTopics() {
      setLoading(true);
      setError(null);
      try {
        const topics = await getTopics();
        setTopics(topics);
      } catch (error) {
        setError("Topics not found");
      } finally {
        setLoading(false);
      }
    }
    fetchTopics();
  }, []);

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!topics.length) {
    return <p>No topics found</p>;
  }

  return (
    <main>
      <h2>Topics List Page</h2>
      <section className="topics-list">
        <ul>
          {topics.map((topic) => (
            <li key={topic.slug}>
              <h3>{topic.slug}</h3>
              <p>{topic.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
export default TopicsList;
