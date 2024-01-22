import React, { useState } from 'react';
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
  
    const handleLinkClick = (link) => {
      setActiveLink(link);
      handleSectionChange(link);
    };

    const handleLogout = () => {
        console.log(localStorage.removeItem('token'));
        navigate("/");
      };

  return (
    <div>
      <div className="sidebar" id="sidebar">
         <nav className="sidebar__container">
            <div className="sidebar__logo">
               <img src={fakNews} alt="" className="sidebar__logo-img"/>
            </div>

            <div className="sidebar__content">
               <div className="sidebar__list">
               <SidebarLink name="Inicio" isActive={activeLink === 'home'} onClick={() => handleLinkClick('home')} icon={<FaHome />} />
               <SidebarLink name="Estadisticas" isActive={activeLink === 'statistics'} onClick={() => handleLinkClick('statistics')} icon={<FcStatistics />} />
               <SidebarLink name="Mensajes" isActive={activeLink === 'messages'} onClick={() => handleLinkClick('messages')} icon={<TiMessages />} />
               </div>

               <h3 className="sidebar__title">
                  <span>Admin</span>
               </h3>

               <div className="sidebar__list">
               <SidebarLink name="Publicaciones" isActive={activeLink === 'post'} onClick={() => handleLinkClick('post')} icon={<BsFileEarmarkPost />} />
               <SidebarLink name="Usuarios" isActive={activeLink === 'users'} onClick={() => handleLinkClick('users')} icon={<TbUsersGroup />} />
               <SidebarLink name="Admin" isActive={activeLink === 'admin'} onClick={() => handleLinkClick('admin')} icon={<RiAdminFill />} />
               </div>

               <h3 className="sidebar__title">
                  <span>Sesión</span>
               </h3>

               <div className="sidebar__list">

                <SidebarLink name="Logout" isActive={activeLink === 'logout'} onClick={handleLogout} icon={<IoMdLogOut />} />
                  
               </div>
            </div>

            <div className="sidebar__account">
               <img src="" alt="sidebar image" className="sidebar__perfil"/>

               <div className="sidebar__names">
                  <h3 className="sidebar__name">Will Lens</h3>
                  <span className="sidebar__email">willens@email.com</span>
               </div>

            </div>
         </nav>
      </div>
    </div>
  );
};

export default Sidebar;
