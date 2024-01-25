import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Post from "../../components/Post/Post";
import "./DetailPost.css";

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
    <main>
      <Post
        key={uuidv4()}
        post={post}
        comments={comments}
        setComments={setComments}
        likes={likes}
      />
    </main>
  );
};

export default DetailPost;
