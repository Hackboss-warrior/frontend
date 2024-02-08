import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TokenContext } from "../../utils/TokenContext";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import isAuth from "../../utils/isAuth";

function Admin() {
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

  const handleUserRole = async (userId, newRole) => {
    const shouldPatch = window.confirm(
      "¿Estás seguro de que deseas cambiar el rol a este usario?"
    );

    if (shouldPatch) {
      try {
        await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`,
          { role: newRole },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchUserData();
      } catch (err) {
        console.error("Fallo:", err);
      }
    }
  };

  return (
    <div>
      <h1 className="adminTitle">Admin dashboard</h1>
      <main>
        <div>
          {userData ? (
            <table className="userTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>First Name</th>
                  <th>Email</th>
                  <th>nickName</th>
                  <th>Avatar</th>
                  <th colSpan={2}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.firstName}</td>
                    <td className="adminTableEmail">{user.email}</td>
                    <td>{user.nickName}</td>
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
                      <button
                        onClick={() => handleUserRole(user.id, "admin")}
                        style={{
                          backgroundColor:
                            user.role === "admin"
                              ? "var(--main-red-color)"
                              : "initial",
                          color: user.role === "admin" ? "#fff" : "initial",
                        }}
                        disabled={user.role === "admin"}
                      >
                        Admin
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleUserRole(user.id, "user")}
                        style={{
                          backgroundColor:
                            user.role === "user"
                              ? "var(--main-red-color)"
                              : "initial",
                          color: user.role === "user" ? "#fff" : "initial",
                        }}
                        disabled={user.role === "user"}
                      >
                        User
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Admin;
