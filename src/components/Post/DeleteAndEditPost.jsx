import axios from "axios";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";
import { useContext } from "react";
import { TokenContext } from "../../utils/TokenContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import isId from "../../utils/isId";

const DeleteAndEditPost = ({ post, setPosts, posts }) => {
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const activeLink = localStorage.getItem("activeLink");

  const deletePost = async (postId) => {
    const shouldDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este post?"
    );
    if (shouldDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/post/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        activeLink === "undefined"
          ? navigate("/")
          : setPosts(posts.filter((pst) => pst.id !== postId));

        toast.success("¡Su publicación ha sido eliminada correctamente!");
      } catch (error) {
        toast.error("Se ha producido un error al eliminar la publicación");
      }
    }
  };

  return (
    <>
      <ToastContainer />

      {isId(token) === post.userId ||
      isId(token) === post.idUserTable ? (
        <div className="editDeltBtn">
          <button
            className="editListPostBtn"
            onClick={() => navigate(`/editPost/${post.id}`)}
          >
            <MdModeEditOutline />
          </button>
          <button className="delPostBtn" onClick={() => deletePost(post.id)}>
            <FaTrash />
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

DeleteAndEditPost.propTypes = {
  post: PropTypes.object.isRequired,
  posts: PropTypes.array,
  currentPage: PropTypes.string,
  setPosts: PropTypes.func,
};
export default DeleteAndEditPost;
