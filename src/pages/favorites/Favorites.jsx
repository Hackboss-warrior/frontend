import axios from "axios";
import { useState, useEffect } from "react";
import Post from "../../components/Post/Post";
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
          `${import.meta.env.VITE_BACKEND_URL}/myfavorites`,
          { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log(response, "RESPONSE");
      

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
 <h1>Mis Favoritos</h1>
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
