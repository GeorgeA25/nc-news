import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import ArticleList from "./ArticlesList";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
      </Routes>
    </>
  );
}

export default App;
