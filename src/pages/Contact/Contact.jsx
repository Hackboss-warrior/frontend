import { useState } from "react";
import "./Contact.css";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const handleForm = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("email", email);
      formData.append("body", body);

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
      
      setRespuesta(response.data);
    } catch (error) {
      console.error("No se ha enviado correctamente");
    }
  };

  return (
    <div className="mainContact">
      <section className="titleCabeceraContact">
        <h1 className="titleContact">Contacta con nosotros</h1>
        
      
      <article className="cabeceraContactos">
        <h2>Un lugar donde todas las noticias tienen su espacio y valor.</h2>
        <p>
          FakNews es un periódico digital participativo de buenas noticias
          fundado en el año 2023 y en el que publicamos cada día noticias
          positivas, historias, acontecimientos o sucesos positivos, entrevistas
          a gente que tiene algo bueno que contar… ¡porque tod@s tenemos algo
          bueno y siempre hay algo bueno que contar!
          <br />
          Colabora con nosotros compartiendo tus noticias con nosotros y si tienes algo productivo que contarnos envianos un comentario aquí abajo. 
        </p>
      </article>
      </section>
      <section className="FormContact">
      {respuesta && (
        <h3 className="repuestacondicionalcontact" >
          {respuesta}
        </h3>
      )}
      
      <form className="contactMessage" onSubmit={handleForm}>
        
          <legend>Contacte con nosostros aquí</legend>
          <div className="labelImputConectForm">
            <label htmlFor="subject">Asunto</label>
            <input 
            className="inputFormContac"
              type="text"
              id="subject"
              name="subject"
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Escriba aqui el asunto a tratar..."
              required
            />
          </div>
          <div className="labelImputConectForm">
            <label htmlFor="email">Correo al que responder</label>
            <input
            className="inputFormContac"
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Escriba aqui su correo..."
              required
            />
          </div>
          <div className="labelImputConectForm">
            <label htmlFor="expo">Exponga aqui su consulta</label>
            <input
            className="inputFormContac gruesoConsulta"
            
              type="text"
              id="body"
              name="body"
              onChange={(e) => setBody(e.target.value)}
              placeholder="Exponga su consulta...(max 600 caracteres) "
           
              required
            />
          </div>
          <button type="submit" className="ButtonContact">Enviar consulta</button>
      
      </form>
      </section>
    </div>
  );
};
export default Contact;
