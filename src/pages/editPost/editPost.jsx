import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./editPost.css";
import { v4 as uuidv4 } from "uuid";

import Post from "../../components/Post/Post";
import SaveEditPostButton from "../../components/SaveEditPostButton";

/*
import dateFormat from "../../utils/dateFormat";
import logo from "../../assets/faknews-logo.svg";
import { FaSave } from "react-icons/fa";
*/

const EditPost = () => {
  const [post, setPost] = useState({});

  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/post/${postId}`
        );

        setPost(res.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [postId]);

  return (
    <>
      <Post
        key={uuidv4()}
        post={post}
        title={<h1 className="">{post.title}</h1>}
        postId={post.id}
        avatar={post.avatar}
        nickName={post.nickName}
        createdAt={post.createdAt}
        files={post.files}
        topic={<h2 className="postTopic">{post.topic}</h2>}
        body={post.body}
        tag={post.tag}
        savePostEdit={<SaveEditPostButton />}
      />
    </>
  );

  /* <main className="posts">
      <article className="post">
        <div className="postMainContent">
          <h1 className="postTitle">{post.title}</h1>

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

          {post.files ? (
            <img
              className="postImg"
              src={`${import.meta.env.VITE_BACKEND_URL}/${post.files}`}
              alt={post.topic}
            />
          ) : (
            <img src={logo} className="defaultPostImg" alt="fakNews logo" />
          )}
        </div>

        <div className="postContent">
          <h2 className="postTopic"> {post.topic}</h2>
          <p className="postBody">{post.body}</p>
        </div>
        <p className="postTag">{post.tag}</p>
        <div className="saveEditBtnSection">
          <button className="saveEditBtn" onClick={() => editPost}>
            <FaSave />
          </button>
        </div>
      </article>
    </main> */
};

export default EditPost;
