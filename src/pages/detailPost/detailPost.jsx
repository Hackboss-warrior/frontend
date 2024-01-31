import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Post from "../../components/Post/Post";
import "./DetailPost.css";
import Comments from "../../components/Comments";
import Interactions from "../../components/Interactions";
import AddFavoritePost from "../../components/AddFavoritePost";
import DeleteAndEditPost from "../../components/Post/DeleteAndEditPost";

const DetailPost = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/post/${postId}`
        );

        setPost(res.data[0]);
        setComments(res.data[1]);
        setLikes(res.data[2]);
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
        title={<h1 className="postTitle">{post.title}</h1>}
        postId={post.id}
        avatar={post.avatar}
        nickName={post.nickName}
        interactions={
          <Interactions post={post} likes={likes} setLikes={setLikes} />
        }
        addFavorites={<AddFavoritePost post={post} />}
        deletePost={<DeleteAndEditPost post={post} />}
        createdAt={post.createdAt}
        files={post.files}
        topic={<h2>{post.topic}</h2>}
        body={post.body}
        tag={post.tag}
        comments={comments}
        setComments={setComments}
        likes={likes}
        setLikes={setLikes}
      />
      <Comments
        comments={comments}
        setComments={setComments}
        postId={post.id}
      />
    </>
  );
};

export default DetailPost;
