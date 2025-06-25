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

export function getArticleById(article_id) {
  return fetch(`https://nc-news-api-aoq3.onrender.com/api/articles/${article_id}`).then(
    (res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: "Failed to fetch article by id",
        });
      }
      return res.json().then(({article}) => {
        return article
      })
      });
    }
