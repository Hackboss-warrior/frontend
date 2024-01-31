import PropTypes from "prop-types";

import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import isAuth from "../isAuth";

import axios from "axios";

const AddFavoritePost = ({ post }) => {
  const [fav, setFav] = useState(<FaRegStar />);
  const [cookies] = useCookies(["Token"]);
  const navigate = useNavigate();

  const addFavoriteHandler = async (postId) => {
    console.log(postId);
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

      // Funciona, almacena en favoritos y borra.
      //Falta que cambien bien los botones a la hora de enviar el favorito, es decir cuando esté marcado que se mantenga y cuando no que pinte el otro. Se puede condicionar utilizando el res.data y cambiándolo en el back [echarle un ojo]
      console.log(res);
      setFav(<FaStar />);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className="favoriteBtn"
      onClick={() => {
        addFavoriteHandler(post.id);
      }}
    >
      {fav}
    </button>
  );
};

AddFavoritePost.propTypes = {
  post: PropTypes.object.isRequired,
};

export default AddFavoritePost;
