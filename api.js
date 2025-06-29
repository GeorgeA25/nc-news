export function getAllArticles(sort_by = "created_at", order = "desc") {
  return fetch(
    `https://nc-news-api-aoq3.onrender.com/api/articles?sort_by=${sort_by}&order=${order}`
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject({
        status: res.status,
        msg: "Failed to fetch articles",
      });
    }
    return res.json().then(({ articles }) => {
      return articles;
    });
  });
}

export function getArticleById(article_id) {
  return fetch(
    `https://nc-news-api-aoq3.onrender.com/api/articles/${article_id}`
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject({
        status: res.status,
        msg: "Failed to fetch article by id",
      });
    }
    return res.json().then(({ article }) => {
      return article;
    });
  });
}

export function getCommentsById(article_id) {
  return fetch(
    `https://nc-news-api-aoq3.onrender.com/api/articles/${article_id}/comments`
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject({
        status: res.status,
        msg: "Failed to fetch comments by id",
      });
    }
    return res.json().then(({ comments }) => {
      return comments;
    });
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

export function getTopics() {
  return fetch("https://nc-news-api-aoq3.onrender.com/api/topics").then(
    (res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: "Failed to fetch topics",
        });
      }
      return res.json().then(({ topics }) => {
        return topics;
      });
    }
  );
}

export function getArticleByTopic(topic_slug) {
  return fetch(
    `https://nc-news-api-aoq3.onrender.com/api/articles?topic=${topic_slug}`
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject({
        status: res.status,
        msg: "Failed to fetch articles by topic",
      });
    }
    return res.json().then(({ articles }) => {
      return articles;
    });
  });
}

export function patchArticleVotes(article_id, inc_votes) {
  return fetch(
    `https://nc-news-api-aoq3.onrender.com/api/articles/${article_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inc_votes }),
    }
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject({
        status: res.status,
        msg: "Failed to patch votes",
      });
    }
    return res.json().then(({ article }) => {
      return article;
    });
  });
}

export function postCommentToArticle(article_id, comment) {
  const { username, body } = comment;
  return fetch(
    `https://nc-news-api-aoq3.onrender.com/api/articles/${article_id}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, body }),
    }
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject({
        status: res.status,
        msg: "Failed to post comment",
      });
    }
    return res.json().then(({ comment }) => {
      return comment;
    });
  });
}

export function deleteCommentById(comment_id) {
  return fetch(
    `https://nc-news-api-aoq3.onrender.com/api/comments/${comment_id}`,
    {
      method: "DELETE",
    }
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject({
        status: res.status,
        msg: "Failed to delete comment",
      });
    }
    return true;
  });
}
