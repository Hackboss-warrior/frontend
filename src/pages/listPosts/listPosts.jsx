import axios from "axios";
import { useState, useEffect } from "react";
import "./listPosts.css";
import Post from "../../components/Post";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

const ListPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/posts`
        );
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Listado de posts</h1>

      <div className="posts">
        {posts.map((post) => (
          <Link
            key={uuidv4()}
            to={`${import.meta.env.VITE_FRONTEND_URL}/post/${post.id}`}
          >
            <Post key={uuidv4()} post={post} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default ListPosts;
