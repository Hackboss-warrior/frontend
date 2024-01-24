import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import dateFormat from "../utils/dateFormat";
import { Link, useNavigate } from "react-router-dom";

const Comments = ({ comments, postId, setComments }) => {
  const [token] = useState(localStorage.getItem("token"));
  const [commentValue, setCommentValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const insertComment = async (e) => {
    e.preventDefault();

    // Con esta línea envíamos al usuario no logueado a la página de login
    !token && navigate("/login");

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
      console.error(error);
      setErrorMsg(error.response.data.error);
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
  };

  return (
    <div className="comments">
      <h3>Comentarios</h3>
      {/* Cambiar por react toastify */}
      {errorMsg}
      {/* Cambiar por react toastify */}
      <form className="commentsForm" onSubmit={insertComment}>
        <input
          type="tex"
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

      {comments
        .filter((comment) => comment.postId === postId)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map((cmt) => (
          <div className="commentBox" key={cmt.id} id="commentBox">
            <div className="commentUserInfoDate">
              <div className="commentUserInfo">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${cmt.avatar}`}
                  className="userAvatar"
                />
                <h4 className="commentNickName">{cmt.nickName}</h4>
              </div>
              <p className="commentDate">{dateFormat(cmt.createdAt)}</p>
            </div>
            <p className="commentContent">{cmt.comment}</p>
          </div>
        ))}
      <div></div>
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.number,
  setComments: PropTypes.func,
};

export default Comments;
