import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Admin.css";
import { TokenContext } from "../../utils/TokenContext";
import { useNavigate } from "react-router-dom";
import isAuth from "../../utils/isAuth";

const User = () => {
  const [userData, setUserData] = useState(null);
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    if (!isAuth(token)) {
      navigate("/login");
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(res.data);
    } catch (err) {
      console.error("Fallo:", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    const shouldDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );

    if (shouldDelete) {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchUserData();
    }
  };

  return (
    <div>
      <h1 className="adminTitle">Usuarios</h1>
      <main>
        <div>
          {userData ? (
            <table className="userTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>First Name</th>
                  <th className="adminTableEmail">Email</th>
                  <th className="adminTableBio">Bio</th>
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
                    <td className="adminTableEmail">{user.email}</td>
                    <td className="adminTableBio">{user.BIO}</td>
                    <td>
                      {user.avatar && (
                        <img
                          className="userAvatar"
                          src={`${import.meta.env.VITE_BACKEND_URL}/${
                            user.avatar
                          }`}
                          alt={`Usuario`}
                        />
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleDeleteUser(user.id)}>
                        Borrar
                      </button>
                    </td>
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
};

export default User;
