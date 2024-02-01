import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import isAuth from "../../isAuth";
import PropTypes from "prop-types";
import dateFormat from "../../utils/dateFormat";

const ModifyProfile = ({ user }) => {
  const [name, setName] = useState("");
  const [firstName, setfirstName] = useState("");
  const [nickName, setnickName] = useState("");
  const [email, setemail] = useState("");
  const [BIO, setBIO] = useState("");
  const [password, setpassword] = useState("");
  
  // const [avatar, setavatar] = useState("");
  const [DOB, setDOB] = useState("");

  /*manejador del botón editar formulario*/
  const [button, setButton] = useState("button");
  const [respuesta,setrespuesta] = useState("")
  const [cookies] = useCookies(["Token"]);
  const navigate = useNavigate();
  //control de edad
  const currentDate = new Date().toISOString().split("T")[0];

  const oldDate = new Date(new Date().getFullYear() - 100, 0, 1)
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    if (!isAuth(cookies.Token)) {
      navigate("/login");
    }
  }, [cookies.Token]);

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
      if (DOB) {
        formData.append("DOB", DOB);
      }


      console.log(Object.fromEntries(formData))
        const  response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user`, formData, {

        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.Token}`,
        },
      
            });
      setButton("form");
 
      setrespuesta(response.data)
      if (respuesta) {
        setTimeout(() => {
          navigate("/profile");
        }, 5000);
      }
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
    <div className="formContainter">
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
              type="email"
              onChange={(e) => setemail(e.target.value)}
              id="correo"
              name="correo"
              placeholder={user.email}
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
              type="date"
              onChange={(e) => setDOB(e.target.value)}
              id="DOB"
              name="DOB"
              placeholder={dateFormat(user.DOB)}
              min={oldDate}
              max={currentDate}
            />
          </section>

          <section className="FormSectionProfile">
            <input
              className="inputFormProfile Biografia"
              type="text"
              onChange={(e) => setBIO(e.target.value)}
              id="bio"
              name="bio"
              placeholder={user.BIO}
            />
          </section>
          
          <section className="buttonsFrom">
            <button className="ButtonForm sendButton" type="submit">
              Enviar
            </button>
            <button
              className="ButtonForm"
              type="submit"
              onClick={changeBtnForm}
            >
              Cancelar
            </button>
          </section>
        </form>
      )}
    </div>
  );
};

ModifyProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ModifyProfile;
