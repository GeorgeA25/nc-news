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
