import React, { useState, useEffect } from "react";
import axios from "axios";
import './Admin.css';

const User = () => {
  const [userData, setUserData] = useState(null);
  const [Token, setMiLocalStorage] = useState(localStorage.getItem('Token') || '');

  const handleLocalStorageChange = (e) => {
    setMiLocalStorage(e.newValue);
    fetchUserData();
  };
 
  useEffect(() => {
    window.addEventListener('storage', handleLocalStorageChange);
    fetchUserData();
    return () => {
      window.removeEventListener('storage', handleLocalStorageChange);
    };
  }, [Token]); 

  const fetchUserData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      setUserData(res.data);

    } catch (err) {
      console.error("Fallo:", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    const shouldDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");

    if (shouldDelete) {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });

      fetchUserData();
    }
  };

  return (
    <div>
      <main>
        <div>
          {userData ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>First Name</th>
                  <th>Email</th>
                  <th>Bio</th>
                  <th>Avatar</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.firstName}</td>
                    <td>{user.email}</td>
                    <td>{user.BIO}</td>
                    <td>{user.avatar && (
                      <img className="userAvatar"
                        src={`${import.meta.env.VITE_BACKEND_URL}/${user.avatar}`}
                        alt={`Usuario`}
                      />
                    )}</td>
                    <td><button onClick={() => handleDeleteUser(user.id)}>Borrar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default User;
