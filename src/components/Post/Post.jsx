import PropTypes from "prop-types";
import Comments from "../Comments";
import { Link } from "react-router-dom";
import "./Post.css";
import { FaCommentAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";

const Post = ({ post, comments, setComments, currentPage }) => {
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

        <Link to={`${import.meta.env.VITE_FRONTEND_URL}/post/${post.id}`}>
          {post.files && (
            <img
              className="postImg"
              src={`${import.meta.env.VITE_BACKEND_URL}/${post.files}`}
              alt={post.topic}
            />
          )}
        </Link>

        <div className="interactComments">
          <p className="postInteractions">
            {" "}
            <FaRegHeart /> {post.interaction}
          </p>

          <p className="commentsNumber">
            <FaCommentAlt />
            {comments.filter((comment) => comment.postId === post.id).length}
          </p>
        </div>
        {/* Hay que crear un componente similar para recuperación de interacciones, además de retocar el back para que los sirva en una sola petición junto con los comentarios y los posts, asignarlas a un estado y pasarlas como props (es un proceso muy similar al de los comentarios)*/}
        <div className="postContent">
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
            <p className="postCreatedAt">{post.createdAt}</p>
          </div>
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
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func,
  currentPage: PropTypes.string,
};

export default Post;
