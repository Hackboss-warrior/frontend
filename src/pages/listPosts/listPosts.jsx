import axios from "axios";
import { useState, useEffect } from "react";
import "./listPosts.css";
import Post from "../../components/Post/Post";
import { v4 as uuidv4 } from "uuid";

const ListPosts = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentPage] = useState("list");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/posts`
        );

        console.log(res);

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
      <h1>Listado de posts</h1>

      <main className="posts">
        {posts.map(
          (post) => (
            console.log(post),
            (
              <Post
                key={uuidv4()}
                post={post}
                comments={comments}
                setComments={setComments}
                currentPage={currentPage}
              />
            )
          )
        )}
      </main>
    </>
  );
};

export default ListPosts;
