import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../pages/Admin/Admin.css';
import SidebarLink from './SidebarLink';
import { FcStatistics } from "react-icons/fc";
import { IoMdLogOut } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { RiAdminFill } from "react-icons/ri";
import { TbUsersGroup } from "react-icons/tb";
import { BsFileEarmarkPost } from "react-icons/bs";
import fakNews from '../assets/faknews-logo.svg';

const Sidebar = ({ handleSectionChange }) => {
   const [activeLink, setActiveLink] = useState('home');
   const navigate = useNavigate();
   const [user, setUser] = useState([]);
   const token = localStorage.getItem("token");

   //  useEffect(() => {
   //    const storedActiveLink = localStorage.getItem('activeLink');
   //    setActiveLink(storedActiveLink || 'home'); 
   //  }, []);

   useEffect(() => {
      const path = location.pathname;

      const linkMap = {
         '/': 'home',
         '/register': 'register',
         '/profile': 'profile',
         '/contact': 'contact',
         '/users': 'users',
         '/login': 'login',
         '/about': 'about',
         '/admin': 'admin',
      };
      setActiveLink(linkMap[path] || 'home');
      localStorage.setItem('activeLink', linkMap[path]);
   }, [location.pathname])

   useEffect(() => {
      if (token) {
         const fetchData = async () => {
            try {
               console.log("1")
               const response = await axios.get(
                  `${import.meta.env.VITE_BACKEND_URL}/profile`, { headers: { 'Authorization': `Bearer ${token}` } }
               );
               console.log("2")
               setUser(response.data); 
            }
            catch (err) {
               console.error("Fallo:", err);
            }
         }
         fetchData();
      }

   }, [token]);



   const handleLinkClick = (link, url) => {
      setActiveLink(link);
      localStorage.setItem('activeLink', link);
      navigate(url);
   };

   const handleLogout = () => {
      localStorage.removeItem('token')
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
                     <SidebarLink name="Inicio" isActive={activeLink === 'home'} onClick={() => handleLinkClick('home', '/')} icon={<FaHome />} />
                     <SidebarLink name="About" isActive={activeLink === 'about'} onClick={() => handleLinkClick('about', '/about')} icon={<FcStatistics />} />
                     <SidebarLink name="Contacto" isActive={activeLink === 'contact'} onClick={() => handleLinkClick('contact', '/contact')} icon={<TiMessages />} />
                  </div>

                  <h3 className="sidebar__title">
                     <span>Admin</span>
                  </h3>

                  <div className="sidebar__list">
                     <SidebarLink name="Publicaciones" isActive={activeLink === 'post'} onClick={() => handleLinkClick('post')} icon={<BsFileEarmarkPost />} />
                     <SidebarLink name="Usuarios" isActive={activeLink === 'users'} onClick={() => handleLinkClick('users', '/login')} icon={<TbUsersGroup />} />
                     <SidebarLink name="Admin" isActive={activeLink === 'admin'} onClick={() => handleLinkClick('admin')} icon={<RiAdminFill />} />
                  </div>

                  <h3 className="sidebar__title">
                     <span>Temas</span>
                  </h3>

                  <div className="sidebar__list">
                     <SidebarLink name="Política" isActive={activeLink === 'politica'} icon={<BsFileEarmarkPost />} />
                     <SidebarLink name="Economía" isActive={activeLink === 'economia'} icon={<TbUsersGroup />} />
                     <SidebarLink name="Tecnología" isActive={activeLink === 'tecnologia'} icon={<RiAdminFill />} />
                     <SidebarLink name="Ciencia" isActive={activeLink === 'ciencia'} icon={<BsFileEarmarkPost />} />
                     <SidebarLink name="Salud" isActive={activeLink === 'salud'} icon={<TbUsersGroup />} />
                     <SidebarLink name="Cultura" isActive={activeLink === 'cultura'} icon={<RiAdminFill />} />
                     <SidebarLink name="Deportes" isActive={activeLink === 'deportes'} icon={<BsFileEarmarkPost />} />
                     <SidebarLink name="Entretenimiento" isActive={activeLink === 'entretenimiento'} icon={<TbUsersGroup />} />
                     <SidebarLink name="NSFW" isActive={activeLink === 'nsfw'} icon={<RiAdminFill />} />
                  </div>

                  <h3 className="sidebar__title">
                     <span>Mi perfil</span>
                  </h3>

                  <div className="sidebar__list">
                     {token && (<SidebarLink name="Profile" isActive={activeLink === 'profile'} onClick={() => handleLinkClick('profile', '/profile')} icon={<IoMdLogOut />} />)}
                     {!token && (<SidebarLink name="Login" isActive={activeLink === 'login'} onClick={() => handleLinkClick('login', '/login')} icon={<IoMdLogOut />} />)}
                     {!token && (<SidebarLink name="Register" isActive={activeLink === 'register'} onClick={() => handleLinkClick('register', '/register')} icon={<IoMdLogOut />} />)}
                     {token && (<SidebarLink name="Logout" isActive={activeLink === 'logout'} onClick={handleLogout} icon={<IoMdLogOut />} />)}
                  </div>
               </div>
               {token ? <div className="sidebar__account">
                  <img src={`${import.meta.env.VITE_BACKEND_URL}/${user.avatar}`} alt="sidebar image" className="sidebar__perfil" />

                  <div className="sidebar__names">
                     <h3 className="sidebar__name">{user.nickName}</h3>
                     <span className="sidebar__email">{user.email}</span>
                  </div>

               </div> : "FakNews"}
            </nav>
         </div>
      </div>
   );
};

export default Sidebar;
