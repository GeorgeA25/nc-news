import { useState } from "react";
import { postCommentToArticle } from "../api";

function CommentForm({article_id, users, addComment}) {
    const [selectedUser, setSelectedUser] = useState("")
    const [commentInput, setCommentInput] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()

        const newComment = await postCommentToArticle(article_id, {username: selectedUser, body: commentInput})
        addComment(newComment)
        setCommentInput("")
    }

    const handleChange = (event) => {
        const {id, value} = event.target
        if(id === "user-select") {
            setSelectedUser(value)
        } else if (id === "comment-input") {
            setCommentInput(value)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="user-select">Choose User</label>
            <select id="user-select" value={selectedUser} onChange={handleChange} required>
                <option value="" disabled> Select a user</option>
                {users.map(({username}) => (
                    <option key={username} value={username}>{username}</option>
                ))}
            </select>
            <label htmlFor="comment-input">Your Comment:</label>
            <textarea id="comment-input" value={commentInput} onChange={handleChange} />
            {!commentInput.trim() && (<p>Please write a comment</p>)}
            <button type="submit" disabled={!selectedUser || !commentInput.trim()}>Add Comment</button>
        </form>
    )
}


export default CommentForm