import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Post.css";
import dateFormat from "../../utils/dateFormat";
//Componentes importados
import Interactions from "../Interactions";
import Comments from "../Comments";
//Componentes importados
import { FaCommentAlt } from "react-icons/fa";

import logo from "../../assets/faknews-logo.svg";
const Post = ({ post, comments, setComments, currentPage, likes }) => {
  return (
    <article className="post">
      <div className="postMainContent">
        {currentPage === "list" ? (
          <Link to={`${import.meta.env.VITE_FRONTEND_URL}/post/${post.id}`}>
            <h2 className="postTitle">{post.title}</h2>
          </Link>
        ) : (
          <h1 className="postTitle">{post.title}</h1>
        )}
        <div className="postUserAndDate">
          <div className="postUserInfo">
            {post.avatar && (
              <img
                className="userAvatar"
                src={`${import.meta.env.VITE_BACKEND_URL}/${post.avatar}`}
                alt={`Avatar del usuario: ${post.nickName}`}
              />
            )}
            <p className="nickName"> {post.nickName}</p>
          </div>
          <p className="postCreatedAt">{dateFormat(post.createdAt)}</p>
        </div>
        <Link to={`${import.meta.env.VITE_FRONTEND_URL}/post/${post.id}`}>
          {post.files ? (
            <img
              className="postImg"
              src={`${import.meta.env.VITE_BACKEND_URL}/${post.files}`}
              alt={post.topic}
            />
          ) : (
            <img src={logo} className="defaultPostImg" alt="fakNews logo" />
          )}
        </Link>

        <div className="interactComments">
          <Interactions post={post} likes={likes} />
          <Link
            to={`${import.meta.env.VITE_FRONTEND_URL}/post/${
              post.id
            }/#commentBox`}
          >
            <p className="commentsNumber">
              <FaCommentAlt />
              {comments.filter((comment) => comment.postId === post.id).length}
            </p>
          </Link>
        </div>

        <div className="postContent">
          {currentPage === "list" ? (
            <h3 className="postTopic"> {post.topic}</h3>
          ) : (
            <h2 className="postTopic"> {post.topic}</h2>
          )}
          <p className="postBody">{post.body}</p>
        </div>
      </div>
      {currentPage !== "list" && (
        <Comments
          comments={comments}
          postId={post.id}
          setComments={setComments}
        />
      )}
    </article>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  likes: PropTypes.array,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func,
  currentPage: PropTypes.string,
};

export default Post;
