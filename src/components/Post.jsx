import PropTypes from "prop-types";

const Post = ({ post }) => {
  return (
    <div className="post">
      <p>avatar user:</p>
      {post.avatar && (
        <img src={`${import.meta.env.VITE_BACKEND_URL}/${post.avatar}`} />
      )}
      <p>nickName user: {post.nickName}</p>
      <h2>{post.title}</h2>
      <h3> {post.topic}</h3>
      <p>{post.body}</p>
      {post.files && (
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${post.files}`}
          alt={post.topic}
        />
      )}
      <p>Interaction:{post.interaction}</p>
      <p>Comment: {post.comment}</p>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
