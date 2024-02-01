import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import whiteLogo from "../../assets/fakNews-white-logo-no-bg.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Se ha registrado correctamente");
      navigate("/login");
    } catch (error) {
      setErrorAlert(<div>fakNews: {error.response.data.error}</div>);
      setTimeout(() => {
        setErrorAlert(null);
      }, 5000);
      toast.error("Ha ocurrido un error en el registro");
    }
  };

  return (
    <>
      <ToastContainer />
      <main className="registerMainContent">
        <h1>Bienvenido/a</h1>
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
            <div className="formFooter">
              <button type="submit" className="btn-enviar">
                Regístrame
              </button>
              <p className="formLogin">
                Ya tienes una cuenta? <Link to="/login"> Haz click aquí</Link>
              </p>
            </div>
          </div>
        </form>
        <img src={whiteLogo} className="registerLogo" alt="fakNews logo" />
      </main>
    </>
  );
};

export default Register;
