import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Admin/Admin.css";
import SidebarLink from "./SidebarLink";
import { FcStatistics } from "react-icons/fc";
import { IoMdLogOut } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { RiAdminFill } from "react-icons/ri";
import { TbUsersGroup } from "react-icons/tb";
import { BsFileEarmarkPost } from "react-icons/bs";
import fakNews from "../assets/faknews-logo.svg";
import { useCookies } from 'react-cookie';
import { jwtDecode } from "jwt-decode";
import isAdmin from "../isAdmin";
import isAuth from "../isAuth";

const Sidebar = ({ handleSectionChange }) => {
   const [activeLink, setActiveLink] = useState("home");
   const navigate = useNavigate();
   const [user, setUser] = useState([]);
   const [cookies, removeCookie] = useCookies(['Token']);

   useEffect(() => {
      const path = location.pathname;

      const linkMap = {
         "/": "home",
         "/register": "register",
         "/profile": "profile",
         "/contact": "contact",
         "/users": "users",
         "/login": "login",
         "/about": "about",
         "/admin": "admin",
         "/createpost": "createpost",
      };
      setActiveLink(linkMap[path] || "home");
      localStorage.setItem("activeLink", linkMap[path]);
   }, [location.pathname]);


   useEffect(() => {
      if (isAuth(cookies.Token)) {
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
         fetchData();
      }
   }, [cookies.Token]);

   const handleLinkClick = (link, url) => {
      setActiveLink(link);
      localStorage.setItem("activeLink", link);
      navigate(url);
   };

   const handleLogout = () => {
      removeCookie("Token")
      removeCookie("Id")
      localStorage.removeItem("token")
      navigate("/");
   };

   return (
      <div>
         <div className="sidebar" id="sidebar">
            <nav className="sidebar__container">
               <div className="sidebar__logo">
                  <img src={fakNews} alt="" className="sidebar__logo-img" />
               </div>

               <div className="sidebar__content">
                  <div className="sidebar__list">
                     <SidebarLink
                        name="Inicio"
                        isActive={activeLink === "home"}
                        onClick={() => handleLinkClick("home", "/")}
                        icon={<FaHome />}
                     />
                     {isAuth(cookies.Token) && (<SidebarLink
                        name="Crear Post"
                        isActive={activeLink === "createpost"}
                        onClick={() => handleLinkClick("createpost", "/createpost")}
                        icon={<FcStatistics />}
                     />)}
                     {isAuth(cookies.Token) && (<SidebarLink
                        name="Favoritos"
                        isActive={activeLink === "about"}
                        onClick={() => handleLinkClick("about", "/about")}
                        icon={<FcStatistics />}
                     />)}
                     <SidebarLink
                        name="About"
                        isActive={activeLink === "about"}
                        onClick={() => handleLinkClick("about", "/about")}
                        icon={<FcStatistics />}
                     />
                     <SidebarLink
                        name="Contacto"
                        isActive={activeLink === "contact"}
                        onClick={() => handleLinkClick("contact", "/contact")}
                        icon={<TiMessages />}
                     />
                  </div>

                  {isAdmin(cookies.Token) && (
                     <div>
                        <h3 className="sidebar__title">
                           <span>Admin</span>
                        </h3>

                        <div className="sidebar__list">
                           <SidebarLink
                              name="Publicaciones"
                              isActive={activeLink === "post"}
                              onClick={() => handleLinkClick("users", "/post")}
                              icon={<BsFileEarmarkPost />}
                           />
                           <SidebarLink
                              name="Usuarios"
                              isActive={activeLink === "users"}
                              onClick={() => handleLinkClick("users", "/users")}
                              icon={<TbUsersGroup />}
                           />
                           <SidebarLink
                              name="Admin"
                              isActive={activeLink === "admin"}
                              onClick={() => handleLinkClick("admin", "/admin")}
                              icon={<RiAdminFill />}
                           />
                        </div>
                     </div>
                  )}


                  <h3 className="sidebar__title">
                     <span>Temas</span>
                  </h3>

                  <div className="sidebar__list">
                     <SidebarLink
                        name="Política"
                        isActive={activeLink === "politica"}
                        icon={<BsFileEarmarkPost />}
                     />
                     <SidebarLink
                        name="Economía"
                        isActive={activeLink === "economia"}
                        icon={<TbUsersGroup />}
                     />
                     <SidebarLink
                        name="Tecnología"
                        isActive={activeLink === "tecnologia"}
                        icon={<RiAdminFill />}
                     />
                     <SidebarLink
                        name="Ciencia"
                        isActive={activeLink === "ciencia"}
                        icon={<BsFileEarmarkPost />}
                     />
                     <SidebarLink
                        name="Salud"
                        isActive={activeLink === "salud"}
                        icon={<TbUsersGroup />}
                     />
                     <SidebarLink
                        name="Cultura"
                        isActive={activeLink === "cultura"}
                        icon={<RiAdminFill />}
                     />
                     <SidebarLink
                        name="Deportes"
                        isActive={activeLink === "deportes"}
                        icon={<BsFileEarmarkPost />}
                     />
                     <SidebarLink
                        name="Entretenimiento"
                        isActive={activeLink === "entretenimiento"}
                        icon={<TbUsersGroup />}
                     />
                     <SidebarLink
                        name="NSFW"
                        isActive={activeLink === "nsfw"}
                        icon={<RiAdminFill />}
                     />
                  </div>

                  <h3 className="sidebar__title">
                     <span>Mi perfil</span>
                  </h3>

                  <div className="sidebar__list">
                     {isAuth(cookies.Token) && (
                        <SidebarLink
                           name="Profile"
                           isActive={activeLink === "profile"}
                           onClick={() => handleLinkClick("profile", "/profile")}
                           icon={<IoMdLogOut />}
                        />
                     )}
                     {!isAuth(cookies.Token) && (
                        <SidebarLink
                           name="Login"
                           isActive={activeLink === "login"}
                           onClick={() => handleLinkClick("login", "/login")}
                           icon={<IoMdLogOut />}
                        />
                     )}
                     {!isAuth(cookies.Token) && (
                        <SidebarLink
                           name="Register"
                           isActive={activeLink === "register"}
                           onClick={() => handleLinkClick("register", "/register")}
                           icon={<IoMdLogOut />}
                        />
                     )}
                     {isAuth(cookies.Token) && (
                        <SidebarLink
                           name="Logout"
                           isActive={activeLink === "logout"}
                           onClick={handleLogout}
                           icon={<IoMdLogOut />}
                        />
                     )}
                  </div>
               </div>
               {isAuth(cookies.Token) ? (
                  <div className="sidebar__account">
                     {user.avatar && <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/${user.avatar}`}
                        alt={user.name}
                        className="sidebar__perfil"
                     />}

                     <div className="sidebar__names">
                        <h3 className="sidebar__name">{user.nickName}</h3>
                        <span className="sidebar__email">{user.email}</span>
                     </div>
                  </div>
               ) : (
                  "FakNews"
               )}
            </nav>
         </div>
      </div>
   );
};

export default Sidebar;
