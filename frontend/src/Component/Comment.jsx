import React, { useState, useEffect } from "react";
import axios from "axios";

function CommentSection() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [username, setUsername] = useState("NewUser");

  useEffect(() => {
    axios
      .get("http://localhost:3001/comments")
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching comments:", error);
      });
  }, []);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        username: username,
        text: newComment,
      };

      axios
        .post("http://localhost:3001/comments", newCommentData)
        .then((response) => {
          setComments([...comments, response.data]);
          setNewComment("");
        })
        .catch((error) => {
          console.error("There was an error adding the comment:", error);
        });
    }
  };

  const handleAddReply = (id) => {
    if (newReply.trim()) {
      const replyData = {
        username: "NewUser",
        text: newReply,
      };

      axios
        .post(`http://localhost:3001/comments/${id}/reply`, replyData)
        .then((response) => {
          const updatedComments = comments.map((comment) =>
            comment.id === id
              ? { ...comment, replies: response.data.replies }
              : comment
          );
          setComments(updatedComments);
          setNewReply("");
          setReplyingTo(null);
        })
        .catch((error) => {
          console.error("There was an error adding the reply:", error);
        });
    }
  };

  const handleReplyClick = (id) => {
    setReplyingTo(id);
  };

  const handleEditComment = (id) => {
    const newCommentText = prompt("Edit your comment:");
    if (newCommentText) {
    }
  };

  const handleCancelReply = () => {
    setNewReply("");
    setReplyingTo(null);
  };

  return (
    <section className="comment">
      <div
        className="comment-section"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <h1>Comment Us</h1>
        <div className="comments-container">
          {comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <div className="comment-content">
                <div className="comment-header">
                  <span className="username">{comment.username}</span>
                  <span className="timestamp">{comment.timestamp}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
                <div className="comment-actions">
                  <button
                    className="edit"
                    onClick={() => handleEditComment(comment.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="reply"
                    onClick={() => handleReplyClick(comment.id)}
                  >
                    Reply
                  </button>
                </div>
                {replyingTo === comment.id && (
                  <div className="reply-section">
                    <textarea
                      placeholder="Write a reply..."
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                    />
                    <button
                      className="send-reply-button"
                      onClick={() => handleAddReply(comment.id)}
                    >
                      Send
                    </button>
                    <button
                      className="send-reply-button"
                      onClick={handleCancelReply}
                    >
                      Cancel
                    </button>
                  </div>
                )}
                {comment.replies.length > 0 && (
                  <div className="replies">
                    {comment.replies.map((reply) => (
                      <div className="reply" key={reply.id}>
                        <div className="comment-header">
                          <span className="username">{reply.username}</span>
                          <span className="timestamp">{reply.timestamp}</span>
                        </div>
                        <p className="comment-text">{reply.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="add-comment">
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="send-button" onClick={handleAddComment}>
            Send
          </button>
        </div>
      </div>
    </section>
  );
}

export default CommentSection;
