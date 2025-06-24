export function getAllArticles() {
  return fetch("https://nc-news-api-aoq3.onrender.com/api/articles").then(
    (res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: "Failed to fetch articles",
        });
      }
      return res.json().then(({ articles }) => {
        return articles;
      });
    }
  );
}

export function getArticleById(id) {
  return fetch(`https://nc-news-api-aoq3.onrender.com/api/articles/${id}`).then(
    (res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: "Failed to fetch article by id",
        });
      }
      return res.json()
      });
    }
