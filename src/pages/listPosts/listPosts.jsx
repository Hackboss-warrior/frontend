import axios from "axios";
import { useState, useEffect } from "react";
import "./listPosts.css";
import Post from "../../components/Post";

const ListPosts = () => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/posts`
        );
        setPosts(res.data);
      } catch (error) {
        setErrorMessage(res.data.message);
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Listado de posts</h1>
      <div className="posts">
        {posts.map(post =>(
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default ListPosts;
