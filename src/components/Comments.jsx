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
      console.log(setComments)


      setComments([...comments, res.data]);
      setCommentValue("");

      //Buscando encontré esta solución
      //window.location.reload();
      // Según he visto no es muy óptima porque va un poco en contra de lo que busca react con la SPA, pero es la que hay que no lo doy hecho de otra forma.
    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <div className={`comments-postId-${postId}`}>
      <h3>Comentarios:</h3>

      {comments
        .filter((comment) => comment.postId === postId)
        .map((cmt) => (
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
