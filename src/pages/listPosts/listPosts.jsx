import axios from "axios";
import { useState, useEffect } from "react";
import "./listPosts.css";
import Post from "../../components/Post/Post";
import { v4 as uuidv4 } from "uuid";
import Interactions from "../../components/Interactions";
import AddFavoritePost from "../../components/AddFavoritePost";
import DeleteAndEditPost from "../../components/Post/DeleteAndEditPost";

const ListPosts = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/posts`
        );

        setPosts(res.data[0]);
        setComments(res.data[1]);
        setLikes(res.data[2]);
        setFavs(res.data[3]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
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
    </>
  );
};

export default ListPosts;
