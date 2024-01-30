import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import dateFormat from "../../utils/dateFormat";
import ModifyProfile from "../../components/users/ModifyProfile";

import { useCookies } from "react-cookie";
import isAuth from "../../isAuth";
import { useNavigate } from "react-router-dom";

import Favorites from "../../components/Favorites";

const Profile = () => {
  const [user, setUser] = useState([]);
  const [cookies] = useCookies(["Token"]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    if (!isAuth(cookies.Token)) {
      navigate("/login");
    }
  }, [cookies.Token]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/profile`,
        { headers: { Authorization: `Bearer ${cookies.Token}` } }
      );

      setUser(response.data);
    } catch (err) {
      console.error("Fallo:", err);
    }
  };

  return (
    <>
      <h1 className="titleProfil">My perfil</h1>
      <div className="cuerpoProfile">
        <section className="NicknameAvatar">
          <h1 className="Nickname">{user.nickName}</h1>

          <img
            className="avatarProfile"
            src={`${import.meta.env.VITE_BACKEND_URL}/${user.avatar}`}
            alt={user.name}
          />
        </section>

        <section className="presentacionPersonal">
          <div className="presentacionPersonalPares">
            <p className="presentacionPersonalP">Nombre completo: </p>
            <h3>{user.name + " " + user.firstName}</h3>
          </div>

          <div className="presentacionPersonalPares">
            <p className="presentacionPersonalP">Email: </p>
            <p> {user.email}</p>
          </div>

          <div className="presentacionPersonalPares">
            <p className="presentacionPersonalP">fecha de nacimiento:</p>
            <p> {dateFormat(user.DOB)}</p>
          </div>

          <div className="presentacionPersonalPares">
            <p className="presentacionPersonalP">Biografía: </p>
            <p>{user.BIO}</p>
          </div>
        </section>

        <Favorites />

        <ModifyProfile user={user} />
      </div>
    </>
  );
};

export default Profile;
