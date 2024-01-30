import { FaTrash } from "react-icons/fa";
import { useCookies } from "react-cookie";
import PropTypes from "prop-types";
import isId from "../isId";
import axios from "axios";
import { useParams } from "react-router-dom";

const DeleteComment = ({ cmt, setComments }) => {
  const [cookies] = useCookies(["Token"]);
  const { postId } = useParams();

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
              Authorization: `Bearer ${cookies.Token}`,
            },
          }
        );

      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      {cmt.userId === isId(cookies.Token) && (
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
};

export default DeleteComment;
