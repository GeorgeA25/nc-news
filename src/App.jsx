import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import ArticleList from "./ArticlesList";
import ArticleDetails from "./ArticleDetails";
import TopicsList from "./TopicsPage";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<ArticleDetails />} />
        <Route path="/topics" element={<TopicsList />} />
      </Routes>
    </>
  );
}

export default App;
