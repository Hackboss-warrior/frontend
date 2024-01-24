import {
  BiUpvote,
  BiDownvote,
  // BiSolidUpvote, van a ser los iconos utilizados cuando una persona ya haya interactuado con la publicación
  // BiSolidDownvote,
} from "react-icons/bi";

import PropTypes from "prop-types";

const Interactions = ({ post, likes }) => {
  return (
    <>
      <p className="postLikes">
        <BiUpvote />
        {
          likes.filter(
            (like) => like.postId === post.id && like.interaction === 1
          ).length
        }
      </p>

      <p className="postDisLikes">
        <BiDownvote />
        {
          likes.filter(
            (like) => like.postId === post.id && like.interaction === 0
          ).length
        }
      </p>
    </>
  );
};

Interactions.propTypes = {
  post: PropTypes.object.isRequired,
  likes: PropTypes.array,
};

export default Interactions;
