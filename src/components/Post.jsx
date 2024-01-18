import PropTypes from "prop-types";
import Comments from "./Comments";
import { Link } from "react-router-dom";

const Post = ({ post, comments, setComments }) => {
  return (
    <div className={`post ${post.id}`}>
      <h2>{post.title}</h2>
      <h3> {post.topic}</h3>
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
      {/* Hay que crear un componente similar para recuperación de interacciones, además de retocar el back para que los sirva en una sola petición junto con los comentarios y los posts, asignarlas a un estado y pasarlas como props (es un proceso muy similar al de los comentarios)*/}
      <p>Interaction:{post.interaction}</p>
      <Comments
        comments={comments}
        postId={post.id}
        setComments={setComments}
      />
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func,
};

export default Post;
