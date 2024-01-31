import axios from "axios";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import isId from "../../isId";

const DeleteAndEditPost = ({ post, setPosts, posts }) => {
  const [cookies] = useCookies(["Token"]);
  const navigate = useNavigate();

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
              Authorization: `Bearer ${cookies.Token}`,
            },
          }
        );

        setPosts(posts.filter((pst) => pst.id !== postId));

        toast.success("¡Su publicación ha sido eliminada correctamente!");
        //Informar con react Toastify de que el post se ha eliminado correctamente o de que no se ha podido eliminar.
      } catch (error) {
        toast.error("Se ha producido un error al eliminar la publicación");
      }
    }
  };

  return (
    <>
      <ToastContainer />

      {isId(cookies.Token) === post.userId ||
      isId(cookies.Token) === post.idUserTable ? (
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
