import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";

const Comments = ({ comments, postId, setComments }) => {
  const [token] = useState(localStorage.getItem("token"));
  const [commentValue, setCommentValue] = useState("");

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

      setComments([...comments, res.data]);

      setCommentValue("");

      const resComments = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/posts`
      );
      setComments(resComments.data[1]);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={"comments"}>
      <h3>Comentarios:</h3>

      {comments
        .filter((comment) => comment.postId === postId)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map((cmt) => (
          <div className="commentBox" key={cmt.id}>
            <div className="commentUserInfo">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${cmt.avatar}`}
                className="userAvatar"
              />
              <h4 className="commentNickName">{cmt.nickName}</h4>
              <p>{cmt.createdAt.split("T")[0]}</p>
            </div>
            <p>{cmt.comment}</p>
          </div>
        ))}
      <div>
        <form className="commentsForm" onSubmit={insertComment}>
          <input
            type="text"
            onChange={(e) => setCommentValue(e.target.value)}
            value={commentValue}
            id="comment"
            name="comment"
            placeholder="Introduce tu comentario aquí ..."
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
  comments: PropTypes.array.isRequired,
  postId: PropTypes.number,
  setComments: PropTypes.func,
};

export default Comments;
