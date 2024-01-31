import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import "./Post.css";
import dateFormat from "../../utils/dateFormat";
//Componentes importados
import Interactions from "../Interactions";
import Comments from "../Comments";
//Componentes importados
import { FaCommentAlt } from "react-icons/fa";
import logo from "../../assets/faknews-logo.svg";
import { useEffect } from "react";

import DeleteAndEditPost from "./DeleteAndEditPost";
import axios from "axios";

const Post = ({
  post,
  comments,
  setComments,
  currentPage,
  likes,
  setPosts,
  setLikes,
}) => {
  const navigate = useNavigate();

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
        <div className="interactCommentsButtons">
          <div className="interactComments">
            <Interactions post={post} likes={likes} setLikes={setLikes} />

            <button
              className="commentsNumber"
              onClick={() => {
                navigate(`/post/${post.id}/#commentBox`);
              }}
            >
              <FaCommentAlt />
              {comments.filter((comment) => comment.postId === post.id).length}
            </button>
          </div>
          <DeleteAndEditPost
            post={post}
            setPosts={setPosts}
            currentPage={currentPage}
          />
        </div>

        <div className="postContent">
          {currentPage === "list" ? (
            <h3 className="postTopic"> {post.topic}</h3>
          ) : (
            <h2 className="postTopic"> {post.topic}</h2>
          )}

          <p className="postBody">{post.body}</p>
        </div>
        <p className="postTag">{post.tag}</p>
      </div>
      {currentPage !== "list" && (
        <Comments
          comments={comments}
          setComments={setComments}
          postId={post.id}
        />
      )}
    </article>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  likes: PropTypes.array,
  comments: PropTypes.array,
  setComments: PropTypes.func.isRequired,
  currentPage: PropTypes.string,
  posts: PropTypes.array,
  setPosts: PropTypes.func,
  setLikes: PropTypes.func.isRequired,
};

export default Post;
