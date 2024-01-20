import PropTypes from "prop-types";
import Comments from "../Comments";
import { Link } from "react-router-dom";
import "./Post.css";

const Post = ({ post, comments, setComments, currentPage }) => {
  return (
    <div className={`post`}>
      {currentPage === "list" ? <h2>{post.title}</h2> : <h1>{post.title}</h1>}
      Fecha publicación post: {post.createdAt}
      <p>avatar user:</p>
      {post.avatar && (
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${post.avatar}`}
          alt={`Avatar del usuario: ${post.nickName}`}
        />
      )}
      <p>nickName user: {post.nickName}</p>
      <p>{post.body}</p>
      <Link to={`${import.meta.env.VITE_FRONTEND_URL}/post/${post.id}`}>
        {post.files && (
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${post.files}`}
            alt={post.topic}
          />
        )}
      </Link>
      {currentPage === "list" ? (
        <h3> Topic: {post.topic}</h3>
      ) : (
        <h2> Topic: {post.topic}</h2>
      )}
      {/* Hay que crear un componente similar para recuperación de interacciones, además de retocar el back para que los sirva en una sola petición junto con los comentarios y los posts, asignarlas a un estado y pasarlas como props (es un proceso muy similar al de los comentarios)*/}
      <p>Interaction:{post.interaction}</p>
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
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func,
  currentPage: PropTypes.string,
};

export default Post;
