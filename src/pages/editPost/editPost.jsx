import { useEffect, useState, useContext } from "react";
import { TokenContext } from "../../utils/TokenContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./editPost.css";
import logo from "../../assets/faknews-logo.svg";
import { FaSave } from "react-icons/fa";

const EditPost = () => {
  const [post, setPost] = useState({});
  const { token } = useContext(TokenContext);
  const [isEditingFile, setIsEditingFile] = useState(false);
  const [file, setFile] = useState("");
  const [editableFields, setEditableFields] = useState({
    title: false,
    topic: false,
    body: false,
    tag: false,
  });
  const [editedValues, setEditedValues] = useState({
    title: "",
    topic: "",
    body: "",
    tag: "",
  });

  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/post/${postId}`
        );

        const postData = res.data[0];
        setPost(postData);
        setEditedValues({
          title: postData.title,
          topic: postData.topic,
          body: postData.body,
          tag: postData.tag,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [postId]);
  // Imagen
  const handleFileClick = () => {
    if (!isEditingFile) {
      document.getElementById("fileInput").click();
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files.length > 0 ? e.target.files[0] : null);
    setIsEditingFile(true);
  };
  // Imagen

  const handleFieldClick = (field) => {
    setEditableFields({ ...editableFields, [field]: true });
  };

  const handleEditChange = (field, e) => {
    setEditedValues({ ...editedValues, [field]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", editedValues.title);
      formData.append("topic", editedValues.topic);
      formData.append("body", editedValues.body);
      formData.append("tag", editedValues.tag);
      formData.append("file", file);
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/post/${postId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPost(res.data.updatedPost);
      setEditableFields({
        title: false,
        topic: false,
        body: false,
        tag: false,
      });
    } catch (error) {
      console.error("Error al actualizar la publicación:", error);
    }
  };

  return (
    <>
      <article className="post">
        {editableFields.title ? (
          <input
            type="text"
            value={editedValues.title}
            onChange={(e) => handleEditChange("title", e)}
          />
        ) : (
          <h1 className="" onClick={() => handleFieldClick("title")}>
            {post.title}
          </h1>
        )}

        <div className="postUserAndDate"></div>

        <input
          type="file"
          onChange={handleFileChange}
          id="fileInput"
          name="image"
          className="input-100"
          style={{ display: "none" }}
        />
        {isEditingFile && (
          <img
            src={URL.createObjectURL(file)}
            alt="Imagen de la publicación"
            className="postImg"
          />
        )}
        {!isEditingFile && (
          <label onClick={handleFileClick}>
            {post.files ? (
              <img
                className="postImg"
                src={`${import.meta.env.VITE_BACKEND_URL}/${post.files}`}
                alt="Imagen de la publicación"
              />
            ) : (
              <img src={logo} className="defaultPostImg" alt="fakNews logo" />
            )}
          </label>
        )}

        <div className="postContent">
          {editableFields.topic ? (
            <input
              type="text"
              value={editedValues.topic}
              onChange={(e) => handleEditChange("topic", e)}
            />
          ) : (
            <h2 className="postTopic" onClick={() => handleFieldClick("topic")}>
              {post.topic}
            </h2>
          )}
          {editableFields.body ? (
            <input
              type="text"
              value={editedValues.body}
              onChange={(e) => handleEditChange("body", e)}
            />
          ) : (
            <p className="postBody" onClick={() => handleFieldClick("body")}>
              {post.body}
            </p>
          )}
        </div>
        {editableFields.tag ? (
          <select onChange={(e) => handleEditChange("tag", e)}>
            <option value={post.tag} defaultChecked>
              Selecciona una opción
            </option>
            <option value="Política">Política</option>
            <option value="Economía">Economía</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Ciencia">Ciencia</option>
            <option value="Salud">Salud</option>
            <option value="Cultura">Cultura</option>
            <option value="Deportes">Deportes</option>
            <option value="Entretenimiento">Entretenimiento</option>
            <option value="NSFW">NSFW</option>
            <option value="Otros">Otros</option>
          </select>
        ) : (
          <p className="postTag" onClick={() => handleFieldClick("tag")}>
            {post.tag}
          </p>
        )}
        <div className="saveEditBtnSection">
          <button className="saveEditBtn" onClick={handleSaveEdit}>
            <FaSave />
          </button>
        </div>
      </article>
    </>
  );
};

export default EditPost;
