import PropTypes from "prop-types";

const Post = ({ post }) => {
  return (
    <div className="post">
      <img src={post.files} />
      <p>Topic: {post.topic}</p>
      <p>body: {post.body}</p>
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
