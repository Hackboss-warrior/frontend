import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { TokenContext } from "../utils/TokenContext";
import { useNavigate } from "react-router-dom";
import "../pages/Admin/Admin.css";
import SidebarLink from "./SidebarLink";
import {
  IoMdLogOut,
  IoMdInformationCircle,
  IoIosPerson,
  IoMdSettings,
} from "react-icons/io";
import {
  FaHome,
  FaStar,
  FaMoneyBill,
  FaBook,
  FaBasketballBall,
  FaLaugh,
} from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { AiOutlineStop } from "react-icons/ai";
import { RiAdminFill } from "react-icons/ri";
import { TbUsersGroup, TbWritingSign } from "react-icons/tb";
import { BsFileEarmarkPost, BsPencilSquare } from "react-icons/bs";
import { MdScience, MdHealthAndSafety } from "react-icons/md";
import fakNews from "../assets/faknews-logo.svg";
import isAdmin from "../utils/isAdmin";
import isAuth from "../utils/isAuth";

const Sidebar = ({ handleSectionChange }) => {
  const [activeLink, setActiveLink] = useState("home");
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const { token, loggedUser } = useContext(TokenContext);

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
      "/favorites": "favorites",
    };
    setActiveLink(linkMap[path] || "home");
    localStorage.setItem("activeLink", linkMap[path]);
  }, [location.pathname]);

  useEffect(() => {
    if (isAuth(token)) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/profile`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setUser(response.data);
        } catch (err) {
          console.error("Fallo:", err);
        }
      };
      fetchData();
    }
  }, [token]);

  const handleLinkClick = (link, url) => {
    setActiveLink(link);
    localStorage.setItem("activeLink", link);
    navigate(url);
  };

  const handleLogout = () => {
    removeCookie("Token");
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
              {isAuth(token) && (
                <SidebarLink
                  name="Crear Post"
                  isActive={activeLink === "createpost"}
                  onClick={() => handleLinkClick("createpost", "/createpost")}
                  icon={<BsPencilSquare />}
                />
              )}
              {isAuth(token) && (
                <SidebarLink
                  name="Favoritos"
                  isActive={activeLink === "favorites"}
                  onClick={() => handleLinkClick("favorites", "/favorites")}
                  icon={<FaStar />}
                />
              )}
              <SidebarLink
                name="About"
                isActive={activeLink === "about"}
                onClick={() => handleLinkClick("about", "/about")}
                icon={<IoMdInformationCircle />}
              />
              <SidebarLink
                name="Contacto"
                isActive={activeLink === "contact"}
                onClick={() => handleLinkClick("contact", "/contact")}
                icon={<TiMessages />}
              />
            </div>

            {isAdmin(token) && (
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
                icon={<TbUsersGroup />}
              />
              <SidebarLink
                name="Economía"
                isActive={activeLink === "economia"}
                icon={<FaMoneyBill />}
              />
              <SidebarLink
                name="Tecnología"
                isActive={activeLink === "tecnologia"}
                icon={<IoMdSettings />}
              />
              <SidebarLink
                name="Ciencia"
                isActive={activeLink === "ciencia"}
                icon={<MdScience />}
              />
              <SidebarLink
                name="Salud"
                isActive={activeLink === "salud"}
                icon={<MdHealthAndSafety />}
              />
              <SidebarLink
                name="Cultura"
                isActive={activeLink === "cultura"}
                icon={<FaBook />}
              />
              <SidebarLink
                name="Deportes"
                isActive={activeLink === "deportes"}
                icon={<FaBasketballBall />}
              />
              <SidebarLink
                name="Entretenimiento"
                isActive={activeLink === "entretenimiento"}
                icon={<FaLaugh />}
              />
              <SidebarLink
                name="NSFW"
                isActive={activeLink === "nsfw"}
                icon={<AiOutlineStop />}
              />
            </div>

            <h3 className="sidebar__title">
              <span>Mi perfil</span>
            </h3>

            <div className="sidebar__list">
              {isAuth(token) && (
                <SidebarLink
                  name="Perfil"
                  isActive={activeLink === "profile"}
                  onClick={() => handleLinkClick("profile", "/profile")}
                  icon={<IoIosPerson />}
                />
              )}
              {!isAuth(token) && (
                <SidebarLink
                  name="Login"
                  isActive={activeLink === "login"}
                  onClick={() => handleLinkClick("login", "/login")}
                  icon={<IoMdLogOut />}
                />
              )}
              {!isAuth(token) && (
                <SidebarLink
                  name="Register"
                  isActive={activeLink === "register"}
                  onClick={() => handleLinkClick("register", "/register")}
                  icon={<TbWritingSign />}
                />
              )}
              {isAuth(token) && (
                <SidebarLink
                  name="Logout"
                  isActive={activeLink === "logout"}
                  onClick={handleLogout}
                  icon={<IoMdLogOut />}
                />
              )}
            </div>
          </div>
          {isAuth(token) ? (
            <div className="sidebar__account">
              {user.avatar && (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${user.avatar}`}
                  alt={user.name}
                  className="sidebar__perfil"
                />
              )}

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
