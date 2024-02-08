import {
  BiUpvote,
  BiDownvote,
  BiSolidUpvote,
  BiSolidDownvote,
} from "react-icons/bi";

import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "../utils/TokenContext";
import isAuth from "../utils/isAuth";
import isId from "../utils/isId";

const Interactions = ({ post, likes, setLikes }) => {
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

  const sendLike = async (postId) => {
    //Con esta línea de código nos aseguramos que si el usuario no esta logueado la página le rediriga a login
    if (!isAuth(token)) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/liked`,

        {
          like: 1,
          postId: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLikes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendDisLike = async (postId) => {
    //Con esta línea de código nos aseguramos que si el usuario no esta logueado la página le rediriga a login
    if (!isAuth(token)) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/liked`,

        {
          like: 0,
          postId: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLikes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="postLikes">
        <div className="sendLike">
          {likes.some(
            (like) =>
              like.userId === isId(token) &&
              post.id === like.postId &&
              like.interaction === 1
          ) ? (
            <BiSolidUpvote
              className="clickLikeArrow"
              onClick={() => sendLike(post.id)}
            />
          ) : (
            <BiUpvote
              className="notClickLikeArrow"
              onClick={() => sendLike(post.id)}
            />
          )}
        </div>
        <p className="likesNumber">
          {likes.filter(
            (like) => like.postId === post.id && like.interaction === 1
          ).length -
            likes.filter(
              (like) => like.postId === post.id && like.interaction === 0
            ).length}
        </p>
        <div className="sendDisLike">
          {!likes.some(
            (like) =>
              like.userId === isId(token) &&
              post.id === like.postId &&
              like.interaction === 0
          ) ? (
            <BiDownvote
              className="notClickDislikeArrow"
              onClick={() => sendDisLike(post.id)}
            />
          ) : (
            <BiSolidDownvote
              className="clickDisLikeArrow"
              onClick={() => sendDisLike(post.id)}
            />
          )}
        </div>
      </div>
    </>
  );
};

Interactions.propTypes = {
  post: PropTypes.object.isRequired,
  likes: PropTypes.array.isRequired,
  setLikes: PropTypes.func.isRequired,
};

export default Interactions;
