import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css"
import dateFormat from "../../utils/dateFormat";
import ModifyProfile from "../../components/users/ModifyProfile";
const Profile = () => {
  const [user, setUser] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async() => {
      try {
      
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/profile`, { headers: { 'Authorization': `Bearer ${token}` } }
        );
    console.log(response.data,"RESPONSE");

        setUser(response.data); 
      } 
      catch (err) {
        console.error("Fallo:", err);
      }
    }

    fetchData();
  }, [token]);
  
  
  return (
    <>
    <div className="cuerpoProfile">
      <h1>My perfil</h1>
      <section className="NicknameEmailAvatar">
      <div className="NicknamEmail"><h2>{user.nickName}</h2>
      <p>{user.email}</p></div>
      
      {user.avatar && <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${user.avatar}`}
          alt={user.name}
        />}
        </section>
        <div className="separador"></div>
      <div className="presentacionPersonal">
      <h3>{user.name + " "+ user.firstName}</h3>
      <p>{dateFormat(user.DOB)}</p>
      <p>{user.BIO}</p>

      </div>
      <ModifyProfile/>
    </div>  
    </>
    
  );
};

export default Profile;

