import PropTypes from "prop-types";

const Post = ({ post }) => {
  return (
    <div className="post">
      <h2>Título: {post.title}</h2>
      <img src={post.files} />
      <p>Topic: {post.topic}</p>
      <p>body: {post.body}</p>
    </div>
    // <div>
    //   <h2>{post.title}</h2>
    //   <h3>{post.topic}</h3>
    //   <p>{post.body}</p>
    //   <img src={post.files} />
    // </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
