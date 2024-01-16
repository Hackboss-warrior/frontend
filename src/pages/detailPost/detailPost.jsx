import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Post from "../../components/Post";

const DetailPost = () => {
  const [post, setPost] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/post/${postId}`
        );
        console.log(res.data);
        setPost(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [postId]);
  console.log(post);
  return (
    <>
      <h1>Página de detalle de post</h1>
      <Post post={post} />
    </>
  );
};

export default DetailPost;
