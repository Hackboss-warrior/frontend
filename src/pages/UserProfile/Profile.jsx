import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Profile.css";
import dateFormat from "../../utils/dateFormat";
import ModifyProfile from "../../components/users/ModifyProfile";
import { TokenContext } from "../../utils/TokenContext";
import { useCookies } from "react-cookie";
import isAuth from "../../isAuth";
import { useNavigate } from "react-router-dom";

// import Favorites from "../../components/Favorites";

const Profile = () => {
  const [user, setUser] = useState({});
  const [cookies] = useCookies(["Token"]);
  const { token, loggedUser } = useContext(TokenContext);
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
    <div className="mainPage">
      <h1 className="titleProfil">My perfil</h1>

      <div className="presentacionPersonal">
        <section className="NicknameAvatar">
          <h2 className="Nickname">{user.nickName}</h2>
          <img
            className="avatarProfile"
            src={`${import.meta.env.VITE_BACKEND_URL}/${user.avatar}`}
            alt={user.name}
          />
        </section>
        <div className="PresentacionUser">
          <section className="presentacionPersonal2">
            <article>
              <div className="presentacionPersonalPares">
                <p className="presentacionPersonalP">Usuario: </p>
                <p> {user.nickName}</p>
              </div>

              <div className="presentacionPersonalPares">
                <p className="presentacionPersonalP">Email: </p>
                <p> {user.email}</p>
              </div>
            </article>
            <article>
              <div className="presentacionPersonalPares">
                <p className="presentacionPersonalP">Nombre completo: </p>
                <h3>{user.name + " " + user.firstName}</h3>
              </div>

              <div className="presentacionPersonalPares">
                <p className="presentacionPersonalP">fecha de nacimiento:</p>
                <p> {dateFormat(user.DOB)}</p>
              </div>
            </article>
          </section>
          <section>
            <div className="presentacionPersonalPares">
              <p className="presentacionPersonalP">Biografía: </p>
              <p>{user.BIO}</p>
            </div>
          </section>
        </div>
      </div>
      <ModifyProfile user={user} />
    </div>
  );
};

export default Profile;
