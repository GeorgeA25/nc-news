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

 export function getCommentsById(article_id) {
  return fetch(`https://nc-news-api-aoq3.onrender.com/api/articles/${article_id}/comments`).then(
    (res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: "Failed to fetch comments by id",
        });
      }
      return res.json().then(({comments}) => {
        return comments
      })
      });
    }   

  
export function getUsers() {
  return fetch("https://nc-news-api-aoq3.onrender.com/api/users").then(
    (res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: "Failed to fetch users",
        });
      }
      return res.json().then(({ users }) => {
        return users;
      });
    }
  );
}

export function patchArticleVotes(article_id, inc_votes) {
  return fetch(`https://nc-news-api-aoq3.onrender.com/api/articles/${article_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({inc_votes})
  }).then(
    (res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: "Failed to patch votes",
        });
      }
      return res.json().then(({article}) => {
        return article
      })
      });
    } 


export function postCommentToArticle(article_id, comment) {
  return fetch(`https://nc-news-api-aoq3.onrender.com/api/articles/${article_id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"},
      body: JSON.stringify(
        {username: "tickle122",
          body: comment
        })
  }).then(
    (res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: "Failed to post comment",
        });
      }
      return res.json().then(({comment}) => {
        return comment
      })
      });
    }