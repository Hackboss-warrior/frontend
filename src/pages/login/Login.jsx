import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import whiteLogo from "../../assets/fakNews-white-logo-no-bg.svg";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import { TokenContext } from "../../utils/TokenContext";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [nickName, setnickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);

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
      toast.success("¡Bienvenido/a!");
      setToken(res.data.token)
      navigate("/");
    } catch (error) {
      toast.error("Revisa los datos introducidos");
    }
  };

  return (
    <>
      <ToastContainer />
      <main className="loginMainContent">
        <h1>Accede a tu perfil</h1>

        <div className="input-container">
          <form className="loginForm" onSubmit={logUser}>
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
    </>
  );
};

export default Login;
