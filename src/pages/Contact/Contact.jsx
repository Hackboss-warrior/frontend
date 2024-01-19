import { useState } from "react";
import "./Contact.css";
import axios from "axios";

const Contact = () => {
  const [asunto, setAsunto] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
const[alert, setAlert] =useState("")
  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("asunto", asunto);
    formData.append("email", email);
    formData.append("body", body);

    console.log(body,"body");
    try {

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/contact`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAlert(<h3>su mierda ha sido enviada correctamente</h3>);
      setTimeout(() => {
        setAlert(null);
      }, 5000);

    
      console.log("el envio ha sido satisfact");
    } catch (error) {
      setAlert(<div>fakNews: {error.response.data.error}</div>);
      setTimeout(() => {
        setAlert(null);
      }, 5000);
      
    }
  
  };

  return (
    <>
      <section className="cabeceraContactos">
        <h1>Contacta con nosotros</h1>
        <img
          className="fotoPortada"
          src="src\assets\fakNews-logo.png"
          alt="FotoPortada"
        />
      </section>
      <section>
        <h2>Un lugar donde todas las noticias tenen su espacio y valor.</h2>
        <p>
          FakNews es un periódico digital participativo de buenas noticias
          fundado en el año 2023 y en el que publicamos cada día noticias
          positivas, historias, acontecimientos o sucesos positivos, entrevistas
          a gente que tiene algo bueno que contar… ¡porque tod@s tenemos algo
          bueno y siempre hay algo bueno que contar!
          <br />
          Colabora con nosotros compartiendo tus noticias con nosotros
        </p>
      </section>
      <form className="contactMessage" onSubmit={handleForm}>
        <fieldset>
          <legend>Contacte con nosostros aquí</legend>
          <div className="labelImputConectForm">
            <label htmlFor="asunto">Asunto</label>
            <input
              type="text"
              id="asunto"
              name="asunto"
              onChange={(e) => setAsunto(e.target.value)}
              placeholder="Escriba aqui el asunto a tratar..."
              required
            />
          </div>
          <div className="labelImputConectForm">
            <label htmlFor="email">Correo al que responder</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Escriba aqui su correo..."
              required
            />
          </div>
          <div className="labelImputConectForm">
            <label htmlFor="body">Exponga aqui su consulta</label>
            <input
              type="text"
              id="body"
              name="body"
              onChange={(e) => setBody(e.target.value)}
              placeholder="Exponga su consulta... "
              className="gruesoConsulta"
              required
            />
          </div>
          <button type="submit">Enviar consulta</button>
        </fieldset>
      </form>
    </>
  );
};
export default Contact;
