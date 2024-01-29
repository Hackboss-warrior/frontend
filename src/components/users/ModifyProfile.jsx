import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import isAuth from "../../isAuth";

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
      if (name.trim() !== "") {
        formData.append("name", name);
      }
      if (firstName.trim() !== "") {
        formData.append("firstName", firstName);
      }
      if (nickName.trim() !== "") {
        formData.append("nickName", nickName);
      }
      if (email.trim() !== "") {
        formData.append("email", email);
      }
      if (BIO.trim() !== "") {
        formData.append("BIO", BIO);
      }
      if (password.trim() !== "") {
        formData.append("password", password);
      }
      // formData.append("avatar", avatar);
      // formData.append("DOB", DOB);

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
              placeholder={user.name}
              
            />
            <input
              type="text"
              onChange={(e) => setfirstName(e.target.value)}
              id="apellidos"
              name="apellidos"
              placeholder={user.firstName}
             
            />
            <input
              type="email"
              onChange={(e) => setemail(e.target.value)}
              id="correo"
              name="correo"
              placeholder={user.email}
             
            />
            <input
              type="text"
              onChange={(e) => setBIO(e.target.value)}
              id="bio"
              name="bio"
              placeholder={user.BIO}
              
            />
            <input
              type="text"
              onChange={(e) => setnickName(e.target.value)}
              id="usuario"
              name="usuario"
              placeholder={user.nickName}
             
            />
            <input
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              id="clave"
              name="clave"
              placeholder="*****"
              
            />
          <button type="submit">Enviar</button>
          <button onClick={changeBtnForm}>Cancelar</button>
        </form>
      )}
    </div>
  );
};

export default ModifyProfile;
