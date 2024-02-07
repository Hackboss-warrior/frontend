import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TokenContext } from "../../utils/TokenContext";
import isAuth from "../../utils/isAuth";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [body, setbody] = useState("");
  const [tag, setTag] = useState("");
  const [image, setImage] = useState("");

  // --------- Manejadores de eventos. No se manda al backend ---------
  const { token, loggedUser } = useContext(TokenContext);
  const [errorAlert, setErrorAlert] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth(token)) {
      navigate("/login");
    }
  }, [token]);

  const createNewPost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("topic", topic);
      formData.append("body", body);
      formData.append("tag", tag);
      formData.append("image", image);
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      //navigate("/");
      toast.success("¡Publicación creada exitosamente!");
    } catch (error) {
      setErrorAlert(<div>fakNews: {error.response.data.error}</div>);
      setTimeout(() => {
        setErrorAlert(null);
      }, 5000);
      toast.error("Error al crear la publicación");
    }
  };

  return (
    <>
      <ToastContainer />
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
            <select onChange={(e) => setTag(e.target.value)}>
              <option value="Otros" defaultChecked>Selecciona una opción</option>
              <option value="Política">Política</option>
              <option value="Economía">Economía</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Ciencia">Ciencia</option>
              <option value="Salud">Salud</option>
              <option value="Cultura">Cultura</option>
              <option value="Deportes">Deportes</option>
              <option value="Entretenimiento">Entretenimiento</option>
              <option value="NSFW">NSFW</option>
            </select>
          </div>
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
        {image && (<img
          src={image ? URL.createObjectURL(image) : ""}
          alt="Preview"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />)}
        <button type="submit" className="btn-enviar">
          Crear
        </button>
      </form>
    </>
  );
};

export default CreatePost;
