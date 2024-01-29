import { useEffect, useState } from "react";
import axios from "axios";
import "./About.css";

const About = () => {
  const [userCount, setUserCount] = useState("");
  const [postsCount, setPotsCount] = useState("");
  const [commentsCount, setCommentsCount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("antes de axios");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/about`
        );

        setUserCount(response.data.totalUsers);

        setPotsCount(response.data.totalPosts);

        setCommentsCount(response.data.totalComments);

        
      } catch (error) {
        console.log("error del About");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>About</h1>

      <section className="presentation">
        <p>
          ¡Bienvenidos al caótico circo de la verdad! Somos tu dosis diaria de
          noticias sin pelos en la lengua. Olvídate del aburrimiento, aquí las
          historias son más picantes que tus chismes de vecindario. Sin filtros,
          sin censura, somos la inyección de realidad que necesitas. ¡Prepárate
          para el desmadre informativo que solo nosotros te ofrecemos!{" "}
        </p>
        <p>
          Conoce a nuestros pícaros developers, el dúo dinámico y su genio
          diminuto. Dos colosos del código que creen que miden en líneas de
          programación y un pequeño maestro que les enseña que el tamaño no
          importa en el reino del desarrollo. Entre risas, tacos y líneas de
          código traviesas, estos tres son la mezcla perfecta de travesuras y
          talento. ¡En este circo de noticias, hasta nuestros developers son
          parte del show!
        </p>
      </section>

      <section className="acounting">
        <p>numero de usuarios:{userCount}</p>
        <p>numero de Posts:{postsCount}</p>
        <p>numero de Comments:{commentsCount}</p>
      </section>
    </>
  );
};

export default About;
