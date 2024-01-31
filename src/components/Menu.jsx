// En el componente Admin
import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../pages/Admin/Admin.css';
import Sidebar from './Sidebar.jsx';
import { AiOutlineMenu } from "react-icons/ai";
import fakNews from '../assets/faknews-logo.svg';
import '../pages/Admin/Admin.css'

function Menu() {
  const [title, setTitle] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setContent('');
  };

  const handleToggleSidebar = () => {
    sidebar.classList.toggle('show-sidebar')
    pages.classList.toggle('show-pages')
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts/${title}`);
      console.log(response.data)


      setSearchResults(response.data);

    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  useEffect(() => {
    if (title) {
      handleSearch();
    } else {
      setSearchResults(null);
    }
  }, [title]);

  return (
    <>
      <Sidebar handleSectionChange={handleSectionChange} />
      <header className="header">
        <div className="header__container container">
          <div className="header__toggle" id="header-toggle" onClick={handleToggleSidebar}>
            <AiOutlineMenu />
          </div>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Buscar por título"
          />

          <a href="#" className="header__logo">
            <img src={fakNews} alt="" />
          </a>
        </div>
      </header>
    </>
  );
}

export default Menu;
