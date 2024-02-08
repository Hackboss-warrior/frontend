import PropTypes from "prop-types";
import { useContext } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../utils/TokenContext";
import isAuth from "../utils/isAuth";
import axios from "axios";
import isId from "../utils/isId";

const AddFavoritePost = ({ post, favs, setFavs }) => {
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

  const addFavoriteHandler = async (postId) => {
    if (!isAuth(token)) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/favorite/${postId}`,

        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFavs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return !isAuth(token) ? (
    <></>
  ) : (
    <div className="favContainer">
      <button
        className="favoriteBtn"
        onClick={() => {
          addFavoriteHandler(post.id);
        }}
      >
        {favs.some(
          (fav) => fav.userId === isId(token) && post.id === fav.postId
        ) ? (
          <FaStar />
        ) : (
          <FaRegStar />
        )}
      </button>
    </div>
  );
};

AddFavoritePost.propTypes = {
  post: PropTypes.object.isRequired,
  favs: PropTypes.array.isRequired,
  setFavs: PropTypes.func.isRequired,
};

export default AddFavoritePost;
