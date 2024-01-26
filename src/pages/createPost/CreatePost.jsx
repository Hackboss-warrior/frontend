import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [body, setbody] = useState("");
  // const [tags, setTags] = useState("");
  // const [tags2, setTags2] = useState("");
  // const [tags3, setTags3] = useState("");
  const [image, setImage] = useState("");

  // --------- Manejadores de eventos. No se manda al backend ---------
  const [errorAlert, setErrorAlert] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const createNewPost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("topic", topic);
      formData.append("body", body);
      // formData.append("tags", tags);
      // formData.append("tags2", tags2);
      // formData.append("tagas3", tags3);
      formData.append("image", image);

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/");
    } catch (error) {
      setErrorAlert(<div>fakNews: {error.response.data.error}</div>);
      setTimeout(() => {
        setErrorAlert(null);
      }, 5000);
    }
  };

  return (
    <form className="boxregister" onSubmit={createNewPost}>
      {errorAlert}
      <div className="contenedor-inputs">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          name="title"
          placeholder="Title"
          className="input-48"
          required
        />
        <input
          type="text"
          onChange={(e) => setTopic(e.target.value)}
          id="topic"
          name="topic"
          placeholder="Subtitulo"
          className="input-48"
          required
        />
        <input
          type="text"
          onChange={(e) => setbody(e.target.value)}
          id="body"
          name="body"
          placeholder="Cuerpo de la noticia"
          className="input-100"
          required
        />
        <div className="TrioTags">
        <select name="tag1" id="tag1">       
          <option value="politica">Política</option>
          <option value="economia">Economía</option>
          <option value="tecnologia">Tecnología</option>
          <option value="ciencia">Ciencia</option>
          <option value="salud">Salud</option>
          <option value="cultura">Cultura</option>
          <option value="deportes">Deportes</option>
          <option value="entretenimiento">Entretenimiento</option>
          <option value="nsfw">NSFW</option>
        </select>

        <select name="tag2" id="tag2">
        <option value="0">Vacio</option>
          <option value="politica">Política</option>
          <option value="economia">Economía</option>
          <option value="tecnologia">Tecnología</option>
          <option value="ciencia">Ciencia</option>
          <option value="salud">Salud</option>
          <option value="cultura">Cultura</option>
          <option value="deportes">Deportes</option>
          <option value="entretenimiento">Entretenimiento</option>
          <option value="nsfw">NSFW</option>
        </select>

        <select name="tag3" id="tag3">
        <option value="0">Vacio</option>
          <option value="politica">Política</option>
          <option value="economia">Economía</option>
          <option value="tecnologia">Tecnología</option>
          <option value="ciencia">Ciencia</option>
          <option value="salud">Salud</option>
          <option value="cultura">Cultura</option>
          <option value="deportes">Deportes</option>
          <option value="entretenimiento">Entretenimiento</option>
          <option value="nsfw">NSFW</option>
        </select>

        </div>
        <input
          type="file"
          onChange={(e) =>
            setImage(e.target.files.length > 0 ? e.target.files[0] : null)
          }
          id="image"
          name="image"
          className="input-100"
        />
        <button type="submit" className="btn-enviar">
          Crear
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
