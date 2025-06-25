import { useParams } from "react-router-dom";
import { getArticleById } from "../api";
import { useEffect, useState } from "react";
import { formatDate } from "../utils/utils";

function ArticleDetails() {
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {article_id} = useParams()

    useEffect(() => {
        async function fetchArticleById() {
            setLoading(true)
            setError(null)
            try{
                const articleData = await getArticleById(article_id)
                setArticle(articleData)
            } catch (error) {
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    }
        fetchArticleById()
}, [article_id])



if (loading) {
    return <p>Loading ...</p>
}

if(error) {
    return <p>{error}</p>
}

if(!article) {
    return <p>No article found on {id}</p>
}

const {
    title,
    author,
    topic,
    body,
    comment_count,
    votes,
    created_at,
    article_img_url,
  } = article;

return (
    <section>
    <h2>{title}</h2>
     <article className="article-card">
      <img src={article_img_url} alt={`Image for article titled "${title}"`} />
      <p>Body: {body}</p>
      <p>Author: {author}</p>
      <p>Topic: {topic}</p>
      <p>Comments: {comment_count}</p>
      <p>Votes: {votes}</p>
      <p>Published: {formatDate(created_at)}</p>
      </article>
     </section> 
)

}

export default ArticleDetails