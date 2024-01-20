import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Post from "../../components/Post/Post";

const DetailPost = () => {
  const [post, setPost] = useState([]);
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/post/${postId}`
        );

        setPost(res.data[0]);
        setComments(res.data[1]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [postId]);

  return (
    <>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Volver al listado de posts
      </button>
      <Post
        key={uuidv4()}
        post={post}
        comments={comments}
        setComments={setComments}
      />
    </>
  );
};

export default DetailPost;
