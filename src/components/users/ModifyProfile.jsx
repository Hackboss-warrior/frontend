import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import isAuth from "../../isAuth";
import PropTypes from "prop-types";
const ModifyProfile = ({ user }) => {
  const [name, setName] = useState("");
  const [firstName, setfirstName] = useState("");
  const [nickName, setnickName] = useState("");
  const [email, setemail] = useState("");
  const [BIO, setBIO] = useState("");
  const [password, setpassword] = useState("");
  // const [avatar, setavatar] = useState("");
  // const [DOB, setDOB] = useState("");
  /*manejador del botón editar formulario*/
  const [button, setButton] = useState("button");
  const [cookies] = useCookies(['Token']);
  const navigate = useNavigate();

  useEffect(()=>{
    if (!isAuth(cookies.Token)){
      navigate("/login")
    }
  },[cookies.Token]) 

  const sendModifies = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (name) {
        formData.append("name", name);
      }
      if (firstName) {
        formData.append("firstName", firstName);
      }
      if (nickName) {
        formData.append("nickName", nickName);
      }
      if (email) {
        formData.append("email", email);
      }
      if (BIO) {
        formData.append("BIO", BIO);
      }
      if (password) {
        formData.append("password", password);
      }
      // formData.append("avatar", avatar);
      // formData.append("DOB", DOB);

      console.log(Object.fromEntries(formData))
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${cookies.Token}`,

        },
      });
      setButton("form");
    } catch {
      console.error("error");
    }
  };

  const changeBtnForm = () => {
    if (button === "button") {
      setButton("form");
    } else {
      setButton("button");
    }
  };

  return (
    <div>
      {button === "button" ? (
        <button className="ButtonForm" onClick={changeBtnForm}>
          Editar Perfil
        </button>
      ) : (

        <form className="FormProfile" onSubmit={sendModifies}>
          <legend>Edita tu Perfíl</legend>

          <section className="FormSectionProfile">
            <input
              className="inputFormProfile"
              type="text"
              onChange={(e) => setnickName(e.target.value)}
              id="usuario"
              name="usuario"
              placeholder={user.nickName}

            />
            <input
              className="inputFormProfile"
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              id="clave"
              name="clave"
              placeholder="Contraseña"
              
            />

          </section>
        <section className="FormSectionProfile">
          <input
            className="inputFormProfile"
            type="text"
            onChange={(e) => setName(e.target.value)}
            id="nombre"
            name="nombre"
            placeholder={user.name}
          />
          <input
            className="inputFormProfile"
            type="text"
            onChange={(e) => setfirstName(e.target.value)}
            id="apellidos"
            name="apellidos"
            placeholder={user.firstName}
          />
          <input
            className="inputFormProfile"
            type="email"
            onChange={(e) => setemail(e.target.value)}
            id="correo"
            name="correo"
            placeholder={user.email}
          />
          </section>

          <input
            className="inputFormProfile Biografia"
            type="text"
            onChange={(e) => setBIO(e.target.value)}
            id="bio"
            name="bio"
            placeholder={user.BIO}
          />
        <section className="buttonsFrom">
          <button className="ButtonForm" type="submit">
            Enviar
          </button>
          <button className="ButtonForm" onClick={changeBtnForm}>
            Cancelar
          </button>
          </section>

        </form>
)}
    </div> );
};

ModifyProfile.propTypes = {
  user: PropTypes.object.isRequired,
};






export default ModifyProfile;
