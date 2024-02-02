import axios from "axios";
import { useState, useEffect } from "react";
import Post from "../../components/Post/Post";
import { v4 as uuidv4 } from "uuid";
import Interactions from "../../components/Interactions";
import DeleteAndEditPost from "../../components/Post/DeleteAndEditPost";

import { useCookies } from "react-cookie";
import AddFavoritePost from "../../components/AddFavoritePost";

const Favorites = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [favs, setFavs] = useState([]);
  const [cookies] = useCookies(["Token"]);

  // const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/myfavorites`,
          { headers: { Authorization: `Bearer ${cookies.Token}` } }
        );

        console.log(response);
        setPosts(response.data[0]);
        setComments(response.data[1]);
        setLikes(response.data[2]);
        setFavs(response.data[3]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [cookies.Token]);

  return (
    <>
      <main className="posts">
        <h1>Mis Favoritos</h1>
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
              deletePost={
                <DeleteAndEditPost
                  post={post}
                  posts={posts}
                  setPosts={setPosts}
                />
              }
              comments={comments}
            />
          ))}
      </main>
    </>
  );
};

export default Favorites;
