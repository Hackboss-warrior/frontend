import { useState } from "react";
import "./Contact.css";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {

  const [inputsubject, setInputSubject] = useState("");
  const [inputemail, setInputEmail] = useState("");
  const [inputbody, setInputBody] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    try {

      const formData = new FormData();
      formData.append("subject", e.target.subject.value);
      formData.append("email", e.target.email.value);
      formData.append("body",  e.target.body.value);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/contact`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (!response) {
        throw new Error("sin respuesta");

      }
      setInputSubject("")
      setInputEmail("")
      setInputBody("")

      toast.success(response.data);
    } catch (error) {
      console.error("No se ha enviado correctamente");
      toast.error("Revisa los datos introducidos");
    }
  };

  return (
    <div className="mainContact">
      <ToastContainer />
      <section className="titleCabeceraContact">
        <h1 className="titleContact">Contacta con nosotros</h1>

        <article className="cabeceraContactos">
          <h2>Un lugar donde todas las noticias tienen su espacio y valor.</h2>
          <p>
            FakNews es un periódico digital participativo de buenas noticias
            fundado en el año 2023 y en el que publicamos cada día noticias
            positivas, historias, acontecimientos o sucesos positivos,
            entrevistas a gente que tiene algo bueno que contar… ¡porque tod@s
            tenemos algo bueno y siempre hay algo bueno que contar!
            <br />
            Colabora con nosotros compartiendo tus noticias con nosotros y si
            tienes algo productivo que contarnos envianos un comentario aquí
            abajo.
          </p>
        </article>
      </section>
      <section className="FormContact">
        <form className="contactMessage" onSubmit={handleForm}>
          <legend>Contacte con nosostros aquí</legend>
          <div className="labelImputConectForm">
            
            <input
              className="inputFormContac"
              type="text"
              id="subject"
              name="subject"
              onChange={(e) => setInputSubject(e.target.value)}
              placeholder="Escriba aqui el asunto a tratar..."
              value={inputsubject}
              required
            />
        
          
            <input
              className="inputFormContac"
              type="email"
              id="email"
              name="email"
              onChange={(e) => setInputEmail(e.target.value)}
              placeholder="Escriba aqui su correo..."
              value={inputemail}
              required
            />
            
            <input
              className="inputFormContac gruesoConsulta"
              type="text"
              id="body"
              name="body"
              onChange={(e) => setInputBody(e.target.value)}
              placeholder="Exponga su consulta...(max 600 caracteres) "
              value={inputbody}
              required
            />
          </div>
          <button type="submit" className="ButtonContact">
            Enviar consulta
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
