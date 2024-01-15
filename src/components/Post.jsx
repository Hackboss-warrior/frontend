import PropTypes from "prop-types";

const Post = ({ post }) => {
  console.log(post);

  return (
    <div>
      <h2>{post.title}</h2>
      <h3>{post.topic}</h3>
      <p>{post.body}</p>
      {post.files && (
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${post.files}`}
          alt={post.topic}
        />
      )}
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
