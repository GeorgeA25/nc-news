import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { getCommentsById, getUsers} from "../api";
import CommentForm from "./CommentForm";


function CommentManager({article_id}) {
const [comments, setComments] = useState([])
const [commentsLoading, setCommentsLoading] = useState(true);
const [commentsError, setCommentsError] = useState(null)
const [userLoading, setUserLoading] = useState(true)
const [userLoadError, setUserLoadError] = useState(null)
const [users, setUsers] = useState([])
const [commentPostSuccessMessage, setCommentPostSuccessMessage] = useState(null)
const [commentPostErrorMessage, setCommentPostErrorMessage] = useState(null)

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

 useEffect(() => {
    async function fetchUsers() {
        setUserLoading(true)
        setUserLoadError(null)
        try {
            const userData = await getUsers()
            setUsers(userData)
        } catch (error) {
            setUserLoadError("Failed to load users")
        } finally {
            setUserLoading(false)
        }
    }
    fetchUsers()
 }, [])

const addComment = (newComment) => {
    setComments((currentComments) => [newComment, ...currentComments])
    setCommentPostSuccessMessage("Comment posted successfully")
    setCommentPostErrorMessage(null)
    setTimeout(() => setCommentPostSuccessMessage(null), 5000)
}

const handleCommentPostError = (error) => {
    setCommentPostErrorMessage(error)
    setCommentPostSuccessMessage(null)
    setTimeout(() => setCommentPostErrorMessage(null), 5000)
}

return (
<>
     <section>
    <h3>Comments</h3>
<section className="post-and-error-messages">
    {commentPostSuccessMessage && <p>{commentPostSuccessMessage}</p>}
    {commentPostErrorMessage && <p>{commentPostErrorMessage}</p>}
</section>
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
    <section className="user-loading-error">
    {userLoading && <p>Loading users ...</p>}
    {userLoadError && <p>{userLoadError}</p>}
</section>
<section className="comment-form-section">
    {!userLoading && !userLoadError && (
        <CommentForm
        article_id={article_id}
        users={users}
        addComment={addComment}
        onPostError={handleCommentPostError}
        />
    )}
     </section>
    </section>
    </>
)}


export default CommentManager