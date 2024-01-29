import axios from "axios";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const DeleteAndEditPost = ({ post, setPosts, currentPage }) => {
  const [cookies, updateCookies] = useCookies(["Token"]);
  const token = cookies.Token;
  const storagedUserId = cookies.Id;
  const navigate = useNavigate();

  const deletePost = async (postId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (currentPage === "list") {
        const resPosts = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/posts`
        );

        setPosts(resPosts.data[0]);
      } else {
        navigate("/");
      }

      //Informar con react Toastify de que el post se ha eliminado correctamente o de que no se ha podido eliminar.
    } catch (error) {
      console.error(error);
    }
  };

  const editPost = async () => {};
  return (
    <>
      {Number(storagedUserId) === post.userId ||
      Number(storagedUserId) === post.idUserTable ? (
        <div className="editDeltBtn">
          <button className="editPostBtn" onClick={() => editPost(post.id)}>
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
  currentPage: PropTypes.string,
  setPosts: PropTypes.func,
};
export default DeleteAndEditPost;