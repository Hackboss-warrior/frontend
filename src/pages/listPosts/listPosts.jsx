import axios from "axios";
import { useState, useEffect } from "react";
import "./listPosts.css";
import Post from "../../components/Post";
import Menu from "../../compontents/Menu/Menu";
import { v4 as uuidv4 } from "uuid";
import io from 'socket.io-client'; // Importa la librería del cliente de socket.io

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

  useEffect(() => {
    const socket = io("http://localhost:3000"); // Establece la conexión WebSocket

    // Escucha el evento 'newComment' y actualiza los comentarios
    socket.on('newComment', (newComment) => {
      console.log(newComment);
      setComments([setComments]);
      //setComments((prevComments) => [...prevComments, newComment]);
    });


    // Cierra la conexión al desmontar el componente
    return () => {
      socket.disconnect();
    };
  }, [posts]);  

  return (
    <>
      <Menu />
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
