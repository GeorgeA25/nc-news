import { useState, useEffect } from "react";
import { getTopics } from "../api";
import TopicCard from "./TopicCard";

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
            <TopicCard key={topic.slug} topic={topic} />
          ))}
        </ul>
      </section>
    </main>
  );
}
export default TopicsList;
