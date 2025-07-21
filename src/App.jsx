import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import ArticleList from "./ArticlesList";
import ArticleDetails from "./ArticleDetails";
import TopicsList from "./TopicsPage";
import TopicDetails from "./TopicDetails";
import NotFound from "./NotFound";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<ArticleDetails />} />
        <Route path="/topics" element={<TopicsList />} />
        <Route path="/topics/:slug" element={<TopicDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
