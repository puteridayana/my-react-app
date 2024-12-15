import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            setUser({ id: decoded.id, role: decoded.role });
        }
    }, []);

    const login = async (credentials) => {
        const response = await axios.post(`${process.env.REACT_APP_CALLBACK_URL}/auth/login`, credentials);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setUser(user);
    };

    const register = async (data) => {
        await axios.post(`${process.env.REACT_APP_CALLBACK_URL}/auth/register`, data);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
