import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { TokenContext } from "../../utils/TokenContext";
import { useNavigate } from "react-router-dom";
import isAuth from "../../utils/isAuth";
import PropTypes from "prop-types";
import dateFormat from "../../utils/dateFormat";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { TokenContext } from "../../utils/TokenContext";

const ModifyProfile = ({ user, setUser }) => {
  const [name, setName] = useState("");
  const [firstName, setfirstName] = useState("");
  const [nickName, setnickName] = useState("");
  const [email, setemail] = useState("");
  const [BIO, setBIO] = useState("");
  const [password, setpassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [DOB, setDOB] = useState("");

  /*manejador del botón editar formulario*/
  const [button, setButton] = useState("button");
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  //control de edad
  const currentDate = new Date().toISOString().split("T")[0];

  const [currentAvatar, setCurrentAvatar] = useState(null);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  const handleAvatarClick = () => {
    if (!isEditingAvatar) {
      document.getElementById("fileInput").click();
    }
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files.length > 0 ? e.target.files[0] : null);
    setIsEditingAvatar(true);
  };

  const oldDate = new Date(new Date().getFullYear() - 100, 0, 1)
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    if (!isAuth(token)) {
      navigate("/login");
    }
  }, [token]);

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
      if (avatar) {
        formData.append("avatar", avatar);
      }
      if (DOB) {
        formData.append("DOB", DOB);
      }

      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setButton("form");

      setUser(response.data[0]);

      toast.success("Se han realizado cambios en su perfil");
      navigate("/")
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast.error("Revisa los datos introducidos");
    }
  };

  useEffect(() => {
    setCurrentAvatar(`${import.meta.env.VITE_BACKEND_URL}/${user.avatar}`);
  }, [user.avatar]);

  const changeBtnForm = () => {
    if (button === "button") {
      setButton("form");
    } else {
      setButton("button");
    }
  };

  return (
    <>
      {button === "button" ? (
        <button className="ButtonForm" onClick={changeBtnForm}>
          Editar Perfil
        </button>
      ) : (
        <div className="formContainter">
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

            <input
              type="file"
              onChange={handleFileChange}
              id="fileInput"
              name="image"
              className="input-100"
              style={{ display: "none" }}
            />
            {isEditingAvatar && (
              <img
                src={URL.createObjectURL(avatar)}
                alt={user.name}
                style={{ maxWidth: "25%", maxHeight: "25%" }}
              />
            )}
            {!isEditingAvatar && (
              <label onClick={handleAvatarClick}>
                <img
                  className="avatarProfile"
                  src={currentAvatar}
                  alt={user.name}
                />
              </label>
            )}

            <section className="buttonsFrom">
              <button className="ButtonForm sendButton" type="submit">
                Enviar
              </button>
              <button type="button" className="ButtonForm" onClick={changeBtnForm}>
               Cancelar
              </button>
            </section>
          </form>
          
        </div>
      )}
    </>
  );
};

ModifyProfile.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func,
};

export default ModifyProfile;
