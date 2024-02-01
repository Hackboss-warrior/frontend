import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import dateFormat from "../utils/dateFormat";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import isAuth from "../isAuth";

import DeleteComment from "./DeleteComment";

const Comments = ({ comments, postId, setComments }) => {
  const [cookies] = useCookies(["Token"]);
  const [commentValue, setCommentValue] = useState("");
  const [replyValues, setReplyValues] = useState({}); // Nuevo estado para respuestas
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const insertAnswers = async (e, commentId) => {
    e.preventDefault();
    const replyValue = replyValues[commentId] || "";
    console.log(replyValue);
    console.log(commentId);

    const formData = new FormData();
    formData.append("commentId", commentId);
    formData.append("answer", replyValue);

    try {
      const responsecomments = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/answers`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.Token}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response.data.error);
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
  };

  const insertComment = async (e) => {
    e.preventDefault();

    if (!isAuth(cookies.Token)) {
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("comment", e.target.comment.value);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/post/${postId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.Token}`,
          },
        }
      );

      setCommentValue("");

      setComments(res.data);
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
            <div className="commentTextAndDelBtn">
              <p className="commentContent">{cmt.comment}</p>
              <DeleteComment
                cmt={cmt}
                setComments={setComments}
                comments={comments}
              />
            </div>
            {/* <form className="commentsForm" onSubmit={(e) => insertAnswers(e, cmt.id)}>
              <input
                type="text"
                onChange={(e) => setReplyValues({ ...replyValues, [cmt.id]: e.target.value })}
                value={replyValues[cmt.id] || ''}
                placeholder="Introduce tu respuesta aquí ..."
                className="input-comment"
                required
              />
              <button type="submit">Responder</button>
            </form> */}
          </div>
        ))}
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.number,
  setComments: PropTypes.func,
};

export default Comments;
