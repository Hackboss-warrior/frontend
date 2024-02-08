import { FaTrash } from "react-icons/fa";
import { useContext } from "react";
import { TokenContext } from "../utils/TokenContext";
import PropTypes from "prop-types";
import isId from "../utils/isId";
import axios from "axios";

const DeleteComment = ({ cmt, setComments, comments }) => {
  const { token } = useContext(TokenContext);
  const deleteComment = async (cmtId) => {
    const shouldDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este comentario?"
    );
    if (shouldDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/comments/${cmtId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setComments(comments.filter((comment) => comment.id !== cmtId));
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      {cmt.userId === isId(token) && (
        <button className="delCmtBtn" onClick={() => deleteComment(cmt.id)}>
          <FaTrash />
        </button>
      )}
    </>
  );
};

DeleteComment.propTypes = {
  cmt: PropTypes.object.isRequired,
  setComments: PropTypes.func,
  comments: PropTypes.array,
};

export default DeleteComment;
