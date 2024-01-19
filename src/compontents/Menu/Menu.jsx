import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";
export const Menu = () => {
  const [token, setToken] = useState("");
  
  const handleSearch = (e)=>{
e.preventDefault();
const searchParam = e.target.elements.search.value

//Get  by word

  }
  
  
  
  
  
  
  
  
  
  useEffect(() => {
    setToken(localStorage.getItem("id"));

    // falta por hacer una petición Get, que traiga datos de usuario {nickName,Avatar}
    //  const tokenid

    // async function getUser() {
    //   try {
    //     const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/);
    //     console.log(response);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }

    // getUser()
  }, []);

  return (
    <menu className="cabecera">
      <div className="fijo">
        
        <NavLink to="/">faknews</NavLink>
        <NavLink to="/post">new FakNew</NavLink>
        <NavLink to="/myposts">favoritos</NavLink>
        <NavLink to="/about">contáctenos</NavLink>
        
      </div>


      <form onSubmit={handleSearch}>
        <label htmlFor="Search"></label>
        <input type="text" name="Search" id="search"/>
        <button type="submit">Search</button>
      </form>


      {!token ? (
        <div>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Registro</NavLink>
        </div>
      ) : (
        <div>
          <NavLink to="/admin">administrador</NavLink>
          <NavLink to="/user">Mi Perfíl</NavLink>
          <img src="" alt="avatarUser" />
        </div>
      )}
    </menu>
  );
};
export default Menu;
