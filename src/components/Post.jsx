import PropTypes from "prop-types";
import Comments from "./Comments";

const Post = ({ post, comments, setComments }) => {
  return (
    <div className={`post ${post.id}`}>
      <h2>{post.title}</h2>
      <h3> {post.topic}</h3>
      <p>avatar user:</p>
      {post.avatar && (
        <img src={`${import.meta.env.VITE_BACKEND_URL}/${post.avatar}`} />
      )}
      <p>nickName user: {post.nickName}</p>
      <p>{post.body}</p>
      {post.files && (
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${post.files}`}
          alt={post.topic}
        />
      )}
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
