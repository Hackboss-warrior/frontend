// En el componente Admin
import React, { useState } from 'react';
import axios from "axios";
import '../pages/Admin/Admin.css';
import Sidebar from './Sidebar.jsx';
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import fakNews from '../assets/faknews-logo.svg';

function Menu() {
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [content, setContent] = useState('');
  const [errorAlert, setErrorAlert] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setContent('');
  };

  const handleToggleSidebar = () => {
    sidebar.classList.toggle('show-sidebar')
  };

  return (
    <div className='Hola'>
      <Sidebar handleSectionChange={handleSectionChange} />
      <header className="header">
        <div className="header__container container">
          <div className="header__toggle" id="header-toggle" onClick={handleToggleSidebar}>
            <AiOutlineMenu />
          </div>

          <a href="#" className="header__logo">
            <img src={fakNews} alt="" />
          </a>
        </div>
      </header>
    </div>
  );
}

export default Menu;
