import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Profile.css";
import dateFormat from "../../utils/dateFormat";
import ModifyProfile from "../../components/users/ModifyProfile";
import { TokenContext } from "../../utils/TokenContext";
import { useCookies } from "react-cookie";
import isAuth from "../../isAuth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.error("ha sucedido un percance, estamos trabajando en ello");
    }
  };

  console.log(user, "user");
  return (
    <div className="mainPage">
      <ToastContainer />
      <h1 className="titleProfil">Mi perfil</h1>

      <div className="presentacionPersonal">
        <section className="NicknameAvatar">
          <h2 className="Nickname">{user.nickName}</h2>
          <img
            className="avatarProfile"
            src={`${import.meta.env.VITE_BACKEND_URL}/${user.avatar}`}
            alt={user.name}
          />
        </section>

        <section className="presentacionPersonal2">
          <div className="presentacionPersonalPares">
            <p className="presentacionPersonalP">Usuario: </p>
            <p> {user.nickName}</p>
          </div>

          <div className="presentacionPersonalPares">
            <p className="presentacionPersonalP">Email: </p>
            <p> {user.email}</p>
          </div>

          <div className="presentacionPersonalPares">
            <p className="presentacionPersonalP">Nombre: </p>
            <p>{user.name}</p>
          </div>
          <div className="presentacionPersonalPares">
            <p className="presentacionPersonalP">Apelllidos: </p>
            <p>{user.firstName}</p>
          </div>

          <div className="presentacionPersonalPares">
            <p className="presentacionPersonalP">fecha de nacimiento:</p>
            <p> {dateFormat(user.DOB)}</p>
          </div>
        </section>
      </div>
      <section>
        <div className="presentacionPersonalPares Biografia">
          <p className="presentacionPersonalP ">Biografía: </p>
          <p>{user.BIO}</p>
        </div>
      </section>
      <ModifyProfile user={user} setUser={setUser} />
    </div>
  );
};

export default Profile;
