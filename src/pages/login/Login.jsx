import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [nickName, setnickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const logUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nickName", nickName);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const res = await axios.post("http://localhost:3001/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setToken(localStorage.setItem("token", res.data.token));

      // Una vez logueados queremos que nos redirija automáticamente a la home

      navigate("/");
    } catch (error) {
      setErrorAlert(<div>fakNews: {error.response.data.error}</div>);
      setTimeout(() => {
        setErrorAlert(null);
      }, 5000);
    }
  };

  return (
    <>
      <h1>Accede a tu perfil</h1>
      <form className="loginForm" onSubmit={logUser}>
        {errorAlert}
        <div className="input-container">
          <label htmlFor="user">Introduce tu email o usuario</label>
          <input
            type="text"
            onChange={(e) =>
              setnickName(e.target.value) || setEmail(e.target.value)
            }
            id="user"
            name="user"
            placeholder="Nickname o Email"
            className="input-48"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Introduce tu contraseña</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            placeholder="Contraseña"
            className="input-48"
            required
          />
        </div>
        <button type="submit" className="btn-enviar">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
