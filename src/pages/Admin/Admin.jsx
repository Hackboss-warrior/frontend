import React, { useState, useEffect } from "react";
import axios from "axios";
import './Admin.css';

function Admin() {
    const [userData, setUserData] = useState(null);
    const [Token, setMiLocalStorage] = useState(localStorage.getItem('Token') || '');

  const handleLocalStorageChange = (e) => {
    setMiLocalStorage(e.newValue);
    fetchUserData();
    window.location.reload()
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

    const handleUserRole = async (userId, newRole) => {
        const shouldPatch = window.confirm("¿Estás seguro de que deseas cambiar el rol a este usario?");

        if (shouldPatch) {
            try {
                await axios.patch(
                    `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`,
                    { role: newRole },
                    {
                        headers: {
                            Authorization: `Bearer ${Token}`,
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
                                        <td>{user.email}</td>
                                        <td>{user.nickName}</td>
                                        <td>{user.avatar && (
                                            <img className="userAvatar"
                                                src={`${import.meta.env.VITE_BACKEND_URL}/${user.avatar}`}
                                                alt={`Usuario`}
                                            />
                                        )}</td>
                                        <td>
                                            <button
                                                onClick={() => handleUserRole(user.id, 'admin')}
                                                style={{ backgroundColor: user.role === 'admin' ? 'black' : 'initial' }}
                                                disabled={user.role === 'admin'}
                                            >
                                                Admin
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleUserRole(user.id, 'user')}
                                                style={{ backgroundColor: user.role === 'user' ? 'black' : 'initial' }}
                                                disabled={user.role === 'user'}
                                            >
                                                User
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
}

export default Admin;
