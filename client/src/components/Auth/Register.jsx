import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
    const { register } = useContext(AuthContext);
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            alert('Registration successful');
            navigate('/login');
        } catch (err) {
            console.error('Registration failed:', err);
            alert('Error registering user');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                {/* Add more roles if needed */}
            </select>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
