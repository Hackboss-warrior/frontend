import PropTypes from "prop-types";

import { FaRegStar, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import isAuth from "../isAuth";

import axios from "axios";
import isId from "../isId";

const AddFavoritePost = ({ post, favs, setFavs }) => {
  const [cookies] = useCookies(["Token"]);
  const navigate = useNavigate();

  const addFavoriteHandler = async (postId) => {
    if (!isAuth(cookies.Token)) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/favorite/${postId}`,

        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.Token}`,
          },
        }
      );
      setFavs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return !isAuth(cookies.Token) ? (
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
          (fav) => fav.userId === isId(cookies.Token) && post.id === fav.postId
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
