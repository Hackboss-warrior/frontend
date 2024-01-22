// En el componente Admin
import React, { useState } from 'react';
import axios from "axios";
import './Admin.css';
import Sidebar from '../../components/Sidebar.jsx';
import { AiOutlineMenu } from "react-icons/ai";
import fakNews from '../../assets/faknews-logo.svg';

function Admin() {
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [content, setContent] = useState('');
  const [errorAlert, setErrorAlert] = useState("");
  const [userData, setUserData] = useState(null);
  const [token] = useState(localStorage.getItem("token"));

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setContent('');
  };

  const handleToggleSidebar = () => {
    sidebar.classList.toggle('show-sidebar')
  };

  const getUser = async (e) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(res.data);


    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
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
      <main className="main container" id="main">
        {activeSection === 'home' && (
          <div>
            <h1>Contenido de Home</h1>
          </div>
        )}
        {activeSection === 'statistics' && (
          <div>
            <h1>Contenido de Explore</h1>
          </div>
        )}
        {activeSection === 'messages' && (
          <div>
            {/* Contenido predeterminado para otras secciones */}
            <h1>Contenido mensajes</h1>
          </div>
        )}
        {activeSection === 'post' && (
          <div>
            <h1>Contenido Publicaciones</h1>
          </div>
        )}
        {activeSection === 'users' && (
          getUser(),
          console.log(userData),

          <div>
            {userData ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>First Name</th>
                    <th>Bio</th>
                    {/* Agrega más encabezados según sea necesario */}
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.firstName}</td>
                      <td>{user.BIO}</td>
                      {/* Agrega más celdas según sea necesario */}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Loading...</p>
            )}
            <h1>Contenido de Explore</h1>
          </div>
        )}
        {activeSection === 'admin' && (
          <div>
            {/* Contenido predeterminado para otras secciones */}
            <h1>Contenido mensajes</h1>
          </div>
        )}
      </main>
    </div>
  );
}

export default Admin;
