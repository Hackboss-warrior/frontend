import axios from "axios";
import { useState, useEffect } from "react";

import Post from "./Post/Post";
import { v4 as uuidv4 } from "uuid";


const Favorites = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentPage] = useState("list");


  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/favorites`,
          { headers: { Authorization: `Bearer ${token}` } }
          );

        setPosts(response.data);
        setComments(response.data.comment);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="posts">
 
        {posts.map((post) => (
          <Post
            key={uuidv4()}
            post={post}
            comments={comments}
            setComments={setComments}
            currentPage={currentPage}
          />
        ))}
      </main>
    </>
  );
};

export default Favorites;
