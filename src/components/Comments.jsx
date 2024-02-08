import axios from "axios";
import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { TokenContext } from "../utils/TokenContext";
import dateFormat from "../utils/dateFormat";
import { useNavigate } from "react-router-dom";
import isAuth from "../utils/isAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteComment from "./DeleteComment";

const Comments = ({ comments, postId, setComments }) => {
  const { token } = useContext(TokenContext);
  const [commentValue, setCommentValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const insertComment = async (e) => {
    e.preventDefault();

    if (!isAuth(token)) {
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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCommentValue("");

      setComments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="comments">
      <h3>Comentarios</h3>
      
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
