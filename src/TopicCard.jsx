import { Link } from "react-router-dom";

function TopicCard({ topic }) {
  return (
    <li className="topic-card">
      <Link to={`/topics/${topic.slug}`}>
        <h3>{topic.slug}</h3>
        <p>{topic.description}</p>
      </Link>
    </li>
  );
}

export default TopicCard;
