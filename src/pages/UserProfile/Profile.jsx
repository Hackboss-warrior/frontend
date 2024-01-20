import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../components/Menu/Menu";
import "./Profile.css"
const Profile = () => {
  const [user, setUser] = useState([]);

  const token = localStorage.getItem("token");
  console.log('TOKEN',token);

  useEffect(() => {
    const fetchData = async() => {
      try {
      
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/profile`, { headers: { 'Authorization': `Bearer ${token}` } }
        );
    // console.log(response.data,"RESPONSE");
        setUser(response.data
          ); 
      } 
      catch (err) {
        console.error("Fallo:", err);
      }
    }

    fetchData();
  }, [token]);
  // console.log("user",user);
  
  
  return (
    <>
     <Menu/>
    <div className="cuerpoProfile">
      <h1>My perfil</h1>
      <section className="NicknameEmailAvatar">
      <div className="NicknamEmail"><h2>{user.nickName}</h2>
      <p>{user.email}</p></div>
      
      <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${user.avatar}`}
          alt={user.name}
        />
        </section>
        <div className="separador"></div>
      <div className="presentacionPersonal">
      <h3>{user.name + " "+ user.firstName}</h3>
      <p>{user.DOB}</p>
      <p>{user.BIO}</p>

      </div>

    </div>  
    </>
    
  );
};

export default Profile;
