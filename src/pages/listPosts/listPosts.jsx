import axios from "axios";
import { useState, useEffect } from "react";
import "./listPosts.css";
import Post from "../../components/Post/Post";
import { v4 as uuidv4 } from "uuid";

const ListPosts = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [currentPage] = useState("list");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/posts`
        );

        setPosts(res.data[0]);
        setComments(res.data[1]);
        setLikes(res.data[2]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="posts">
        {posts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => (
            <Post
              key={uuidv4()}
              post={post}
              setPosts={setPosts}
              posts={posts}
              comments={comments}
              setComments={setComments}
              currentPage={currentPage}
              likes={likes}
              setLikes={setLikes}
            />
          ))}
      </main>
    </>
  );
};

export default ListPosts;
