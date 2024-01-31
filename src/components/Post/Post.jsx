import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import "./Post.css";
import dateFormat from "../../utils/dateFormat";
import { FaCommentAlt } from "react-icons/fa";
import logo from "../../assets/faknews-logo.svg";

const Post = ({
  title,
  postId,
  avatar,
  nickName,
  createdAt,
  files,
  topic,
  body,
  tag,
  interactions,
  addFavorites,
  deletePost,
  comments,
}) => {
  const navigate = useNavigate();

  return (
    <article className="post">
      {addFavorites}

      <Link to={`${import.meta.env.VITE_FRONTEND_URL}/post/${postId}`}>
        {title}
      </Link>

      <div className="postUserAndDate">
        <div className="postUserInfo">
          {avatar && (
            <img
              className="userAvatar"
              src={`${import.meta.env.VITE_BACKEND_URL}/${avatar}`}
              alt={`Avatar del usuario: ${nickName}`}
            />
          )}
          <p className="nickName">{nickName}</p>
        </div>
        <p className="postCreatedAt">{dateFormat(createdAt)}</p>
      </div>
      <Link to={`${import.meta.env.VITE_FRONTEND_URL}/post/${postId}`}>
        {files ? (
          <img
            className="postImg"
            src={`${import.meta.env.VITE_BACKEND_URL}/${files}`}
            alt={"Imagen de la publicación"}
          />
        ) : (
          <img src={logo} className="defaultPostImg" alt="fakNews logo" />
        )}
      </Link>
      <div className="interactCommentsButtons">
        <div className="interactComments">
          {interactions}

          <button
            className="commentsNumber"
            onClick={() => {
              navigate(`/post/${postId}/#commentBox`);
            }}
          >
            <FaCommentAlt />
            {comments.filter((comment) => comment.postId === postId).length}
          </button>
        </div>
        {deletePost}
      </div>

      <div className="postContent">
        <h3 className="postTopic">{topic}</h3>
        <p className="postBody">{body}</p>
      </div>
      <p className="postTag">{tag}</p>
    </article>
  );
};

Post.propTypes = {
  title: PropTypes.object.isRequired,
  postId: PropTypes.number,
  avatar: PropTypes.string,
  nickName: PropTypes.string,
  createdAt: PropTypes.string,
  files: PropTypes.string,
  topic: PropTypes.string,
  body: PropTypes.string,
  tag: PropTypes.string,
  interactions: PropTypes.object,
  addFavorites: PropTypes.object,
  deletePost: PropTypes.object,
  comments: PropTypes.array,
};

export default Post;
