import PropTypes from "prop-types";
import Comments from "../Comments";
import { Link } from "react-router-dom";
import "./Post.css";

const Post = ({ post, comments, setComments, currentPage }) => {
  return (
    <article className="post">
      <div className="postMainContent">
        {currentPage === "list" ? (
          <h2 className="postTitle">{post.title}</h2>
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
          <p className="postCreatedAt"> {post.createdAt}</p>
        </div>
        <Link to={`${import.meta.env.VITE_FRONTEND_URL}/post/${post.id}`}>
          {post.files && (
            <img
              className="postImg"
              src={`${import.meta.env.VITE_BACKEND_URL}/${post.files}`}
              alt={post.topic}
            />
          )}
        </Link>

        {/* Hay que crear un componente similar para recuperación de interacciones, además de retocar el back para que los sirva en una sola petición junto con los comentarios y los posts, asignarlas a un estado y pasarlas como props (es un proceso muy similar al de los comentarios)*/}
        <p className="postInteractions">Interactions: {post.interaction}</p>
        {currentPage === "list" ? (
          <h3 className="postTopic"> Topic: {post.topic}</h3>
        ) : (
          <h2 className="postTopic"> Topic: {post.topic}</h2>
        )}
        <p className="postBody">{post.body}</p>
      </div>

      {currentPage === "list" ? (
        <p>
          Nº comentarios :
          {comments.filter((comment) => comment.postId === post.id).length}
        </p>
      ) : (
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
