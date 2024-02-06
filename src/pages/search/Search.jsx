import PropTypes from "prop-types";
import axios from "axios";
import { useState, useEffect } from "react";
import Post from "../../components/Post/Post";
import { v4 as uuidv4 } from "uuid";
import Interactions from "../../components/Interactions";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddFavoritePost from "../../components/AddFavoritePost";

const Search = ({ title, tag }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [favs, setFavs] = useState([]);
  const [cookies] = useCookies(["Token"]);

  // const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          paramTitle: title,
          paramTag: tag,
        });
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/search`,
          { queryParams, headers: { Authorization: `Bearer ${cookies.Token}` } }
        );

        setPosts(response.data[0]);
        setComments(response.data[1]);
        setLikes(response.data[2]);
        setFavs(response.data[3]);
      } catch (error) {
        console.error(error);
        toast.error("Ha sucedido un imprevisto con Búsqueda");
      }
    };

    fetchData();
  }, [cookies.Token, title, tag]);

  return (
    <>
      <ToastContainer />
      <main className="posts">
        <h3>
          Resultados para {title} y tema:{tag}
        </h3>

        {posts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => (
            <Post
              key={uuidv4()}
              title={<h2 className="postTitle">{post.title}</h2>}
              postId={post.id}
              avatar={post.avatar}
              nickName={post.nickName}
              createdAt={post.createdAt}
              files={post.files}
              topic={<h3 className="postTopic">{post.topic}</h3>}
              body={post.body}
              tag={post.tag}
              interactions={
                <Interactions post={post} likes={likes} setLikes={setLikes} />
              }
              addFavorites={
                <AddFavoritePost post={post} favs={favs} setFavs={setFavs} />
              }
              comments={comments}
            />
          ))}
      </main>
    </>
  );
};

Search.propTypes = {
  title: PropTypes.string,
  tag: PropTypes.string,
};
export default Search;
