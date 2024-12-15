import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            navigate('/searchbook');
        } catch (err) {
            console.error('Login failed:', err);
            alert('Invalid username or password');
        }
    };

    const handleNavigateToRegister = () => {
        navigate('/register');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button type="submit">Login</button>
            <p>
                Not registered?{' '}
                <button
                    type="button"
                    onClick={handleNavigateToRegister}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'blue',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        padding: '0',
                        fontSize: 'inherit',
                    }}
                >
                    Register here
                </button>
            </p>
        </form>
    );
};

export default Login;
