import axios from "axios";
import { useState } from "react";

const ModifyProfile = () => {
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

  const sendModifies = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("firstName", firstName);
      formData.append("nickName", nickName);
      formData.append("email", email);
      formData.append("BIO", BIO);
      formData.append("password", password);
      // formData.append("avatar", avatar);
      // formData.append("DOB", DOB);

      const token = localStorage.getItem("token");
      if (!token){throw new Error( "Debes loguearte correctamente para realizar modificaciones")}

      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });
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
      <h1>Editar Perfil</h1>
      {button === "button" ? (
        <button onClick={changeBtnForm}>Editar Perfil</button>
      ) : (
        <form onSubmit={sendModifies}>
          <legend>formulariuo</legend>
          
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              id="nombre"
              name="nombre"
              placeholder="Nombre"
              
            />
            <input
              type="text"
              onChange={(e) => setfirstName(e.target.value)}
              id="apellidos"
              name="apellidos"
              placeholder="Apellidos"
             
            />
            <input
              type="email"
              onChange={(e) => setemail(e.target.value)}
              id="correo"
              name="correo"
              placeholder="Correo"
             
            />
            <input
              type="text"
              onChange={(e) => setBIO(e.target.value)}
              id="bio"
              name="bio"
              placeholder="Biografía"
              
            />
            <input
              type="text"
              onChange={(e) => setnickName(e.target.value)}
              id="usuario"
              name="usuario"
              placeholder="Usuario"
             
            />
            <input
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              id="clave"
              name="clave"
              placeholder="Contraseña"
              
            />
          
       

          <button type="submit" onClick={changeBtnForm}>
            Enviar
          </button>
          <button onClick={changeBtnForm}>Cancelar</button>
        </form>
      )}
    </div>
  );
};

export default ModifyProfile;
