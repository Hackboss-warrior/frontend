import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import"./Menu.css";
export const Menu = () => {
const [user,setUser] = useState([])
// const [search,setSearch]=useState("")
  
// const handleSearch = (e) => {
//     // e.preventDefault();
    // const searchParam = FormData()
    // FormData.append("search",search)
    // console.log(searchParam);





  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async() => {
      try {
      
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/profile`, { headers: { 'Authorization': `Bearer ${token}` } }
        );
    
        setUser(response.data); 
      } 
      catch (err) {
        console.error("Fallo:", err);
      }
    }

    fetchData();
  }, [token]);

  
  return (
    <section className="cabecera">
 {!token ? (
        <div className="CondicionalMenu">
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Registro</NavLink>
        </div>
      ) : (
        <div className="CondicionalMenu">
        
          <NavLink to="/profile">{user.nickName?user.nickName:"Mi Perfil"}</NavLink>
          <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${user.avatar}`}
          alt={user.name}
          className="fotoPerfil"
        />
          {/* {!adminRol?<></>:<NavLink to="/admin">administrador</NavLink>} */}
          </div>
      )}



      <div className="fijo">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/post">new FakNew</NavLink>
        <NavLink to="/myposts">favoritos</NavLink>
        <NavLink to="/contact">contáctenos</NavLink>
      </div>

      {/* <form onSubmit={handleSearch}>
        <label htmlFor="Search"></label>
        <input type="text" name="Search" id="search"  onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              required/>
        <button type="submit">Search</button>
      </form> */}

     
    </section>
  );
};
export default Menu;
