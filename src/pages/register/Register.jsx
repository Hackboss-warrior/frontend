import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [firstName, setfirstName] = useState("");
  const [nickName, setnickName] = useState("");
  const [email, setemail] = useState("");
  const [BIO, setBIO] = useState("");
  const [password, setpassword] = useState("");
  const [avatar, setavatar] = useState("");
  const [DOB, setDOB] = useState("");
  // --------- Manejadores de eventos. No se manda al backend ---------
  const [errorAlert, setErrorAlert] = useState("");
  const currentDate = new Date().toISOString().split("T")[0];
  //const currentYear = new Date().getFullYear();
  //const minYear = currentYear - 100;
  const oldDate = new Date(new Date().getFullYear() - 100, 0, 1)
    .toISOString()
    .split("T")[0];
  const navigate = useNavigate();
  // --------- Manejadores de eventos. No se manda al backend ---------

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("firstName", firstName);
      formData.append("nickName", nickName);
      formData.append("email", email);
      formData.append("BIO", BIO);
      formData.append("password", password);
      formData.append("avatar", avatar);
      formData.append("DOB", DOB);

      await axios.post("http://localhost:3001/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      setErrorAlert(<div>fakNews: {error.response.data.error}</div>);
      setTimeout(() => {
        setErrorAlert(null);
      }, 5000);
    }
  };

  return (
    <form className="boxregister" onSubmit={saveProduct}>
      {errorAlert}
      <div className="contenedor-inputs">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          id="nombre"
          name="nombre"
          placeholder="Nombre"
          className="input-48"
          required
        />
        <input
          type="text"
          onChange={(e) => setfirstName(e.target.value)}
          id="apellidos"
          name="apellidos"
          placeholder="Apellidos"
          className="input-48"
          required
        />
        <input
          type="email"
          onChange={(e) => setemail(e.target.value)}
          id="correo"
          name="correo"
          placeholder="Correo"
          className="input-100"
          required
        />
        <input
          type="text"
          onChange={(e) => setBIO(e.target.value)}
          id="bio"
          name="bio"
          placeholder="Biografía"
          className="input-100"
          required
        />
        <input
          type="text"
          onChange={(e) => setnickName(e.target.value)}
          id="usuario"
          name="usuario"
          placeholder="Usuario"
          className="input-48"
          required
        />
        <input
          type="password"
          onChange={(e) => setpassword(e.target.value)}
          id="clave"
          name="clave"
          placeholder="Contraseña"
          className="input-48"
          required
        />
        <input
          type="date"
          onChange={(e) => setDOB(e.target.value)}
          min={oldDate}
          max={currentDate}
          id="dob"
          name="dob"
          className="input-100"
          required
        />
        <input
          type="file"
          onChange={(e) =>
            setavatar(e.target.files.length > 0 ? e.target.files[0] : null)
          }
          id="avatar"
          name="avatar"
          className="input-100"
        />
        <button type="submit" className="btn-enviar">
          Save
        </button>
        <p>
          Ya tienes una cuenta? <Link to="/login"> Ingresa aquí</Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
