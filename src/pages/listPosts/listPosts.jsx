import axios from "axios";
import { useState, useEffect } from "react";
import "./listPosts.css";
import Post from "../../components/Post";
import Menu from "../../compontents/Menu/Menu";
import { v4 as uuidv4 } from "uuid";
// import { Link } from "react-router-dom";

const ListPosts = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/posts`
        );

        setPosts(res.data[0]);
        setComments(res.data[1]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Menu/>
      <h1>Listado de posts</h1>

      <div className="posts">
        {posts.map((post) => (
          <Post
            key={uuidv4()}
            post={post}
            comments={comments}
            setComments={setComments}
          />
        ))}
      </div>
    </>
  );
};

export default ListPosts;
