import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => { 
    const navigate = useNavigate()


    const saveProduct = async e => {
        e.preventDefault()
        try {
            const formData = new FormData(); 
            formData.append('name', name);
            formData.append('firstName', firstName);
            formData.append('nickName', nickName);
            formData.append('email', email);
            formData.append('BIO', BIO);
            formData.append('password', password);
            formData.append('avatar', avatar); 
            formData.append('DOB', DOB);

            await axios.post('http://localhost:5000/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            });

            navigate('/');
        } catch (error) {
            console.log(error)
            setErrorAlert(
                <div>
                    fakNews: {error.response.data.error}
                </div>
            );
            setTimeout(() => {
                setErrorAlert(null);
            }, 5000);      
        }
    }

    return (
        <div>Trabaja Omar</div>
    )
}

export default Login
