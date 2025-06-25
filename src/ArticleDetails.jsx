import { useParams } from "react-router-dom";
import { getArticleById, getCommentsById } from "../api";
import { useEffect, useState } from "react";
import { formatDate } from "../utils/utils";
import CommentCard from "./CommentCard";

function ArticleDetails() {
    const [article, setArticle] = useState(null)
    const [articleLoading, setArticleLoading] = useState(true);
    const [articleError, setArticleError] = useState(null);
    const [comments, setComments] = useState([])
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [commentsError, setCommentsError] = useState(null)
    const {article_id} = useParams()

    useEffect(() => {
        async function fetchArticleById() {
            setArticleLoading(true)
            setArticleError(null)
            try{
                const articleData = await getArticleById(article_id)
                setArticle(articleData)
            } catch (error) {
        setArticleError("Failed to load article or comments");
      } finally {
        setArticleLoading(false);
      }
    }
    fetchArticleById()
}, [article_id])   ; 
    
    useEffect(() => {
         async function fetchCommentsById() {
            setCommentsLoading(true)
            setCommentsError(null)
            try{
                const commentData = await getCommentsById(article_id)
                setComments(commentData)
            } catch (error) {
        setCommentsError("Failed to load comments by id");
      } finally {
        setCommentsLoading(false);
      }
    }
        fetchCommentsById()

}, [article_id])


if (articleLoading) {
    return <p>Loading ...</p>
}

if(articleError) {
    return <p>{articleError}</p>
}

if(!article) {
    return <p>No article found on {article_id}</p>
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
    <>
    <section className="article-details">
    <h2>{title}</h2>
      <img src={article_img_url} alt={`Image for article titled "${title}"`} />
      <p>Body: {body}</p>
      <p>Author: {author}</p>
      <p>Topic: {topic}</p>
      <p>Comments: {comment_count}</p>
      <p>Votes: {votes}</p>
      <p>Published: {formatDate(created_at)}</p>
     </section> 
    <section>

    <h3>Comments</h3>
    {commentsLoading ? (
        <p> Loading comments ...</p>
    ) : commentsError ? 
    (    <p>{commentsError}</p>
    ) : comments.length === 0 ? (
        <p>No comments yet </p>
    ) : (
       <section className="comments-list">
        <ul>
        {comments.map((comment) => (
         <li key={comment.comment_id}>
          <CommentCard  comment={comment} />
        </li> 
        ))}
        </ul>
     </section>
)}
     </section>
    </> 
)

}

export default ArticleDetails