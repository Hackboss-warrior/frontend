import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import whiteLogo from "../../assets/fakNews-white-logo-no-bg.svg";
import { useCookies } from 'react-cookie';

const Login = () => {
  const [nickName, setnickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const navigate = useNavigate();
  //Usar localStorage
  const [cookies, setCookie] = useCookies(['Token']);

  const logUser = async (e) => {
    e.preventDefault();
    

    const formData = new FormData();
    formData.append("nickName", nickName);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setCookie('Token', res.data.token);
      navigate("/");
    } catch (error) {
      setErrorAlert(<div>fakNews: {error.response.data.error}</div>);
      setTimeout(() => {
        setErrorAlert(null);
      }, 5000);
    }
  };

  return (
    <main className="loginMainContent">
      <h1>Accede a tu perfil</h1>

      <div className="input-container">
        <form className="loginForm" onSubmit={logUser}>
          {errorAlert}

          <input
            type="text"
            onChange={(e) =>
              setnickName(e.target.value) || setEmail(e.target.value)
            }
            id="user"
            name="user"
            placeholder="Nickname o Email"
            className="loginNickname"
            required
          />

          <div>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              placeholder="Contraseña"
              className="loginPassword"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p>
          ¿Aún no tienes cuenta? <Link to="/register"> Registrate aquí</Link>
        </p>
      </div>
      <img src={whiteLogo} className="loginLogo" alt="fakNews logo" />
    </main>
  );
};

export default Login;
