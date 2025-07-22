import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import ArticleList from "./Pages/ArticlesList";
import ArticleDetails from "./Pages/ArticleDetails";
import TopicsList from "./Pages/TopicsPage";
import TopicDetails from "./Pages/TopicDetails";
import NotFound from "./Pages/NotFound";
import "./Styling/App.css";

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
