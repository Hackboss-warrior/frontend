import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";

const Comments = ({ comments, postId, setComments }) => {
  const [token] = useState(localStorage.getItem("token"));
  const [commentValue, setCommentValue] = useState("");

  const filteredComments = comments.filter(
    (comment) => comment.postId === postId
  );

  const insertComment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("comment", e.target.comment.value);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/post/${postId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res);
      setComments([...comments, res.data]);
      setCommentValue("");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={`comments-postId-${postId}`}>
      <h3>Comentarios:</h3>
      {filteredComments.map((cmt) => (
        <div key={cmt.id}>
          <h4>{cmt.nickName}</h4>
          <img src={`${import.meta.env.VITE_BACKEND_URL}/${cmt.avatar}`} />
          <p>{cmt.createdAt.split("T")[0]}</p>
          <p>{cmt.comment}</p>
        </div>
      ))}
      <div>
        <form className="commentsForm" onSubmit={insertComment}>
          <input
            type="text"
            onChange={(e) => setCommentValue(e.target.value)}
            id="comment"
            name="comment"
            placeholder="Introduce tu comentario..."
            className="input-comment"
            required
          />
          <button type="submit">Comentar</button>
        </form>
      </div>
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.isRequired,
  postId: PropTypes.number,
  setComments: PropTypes.func,
};

export default Comments;
