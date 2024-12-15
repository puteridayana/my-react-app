import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Container, Row, Col, Card, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style.css';

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
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card-container">
                <Card className="card-login">
                    <Card.Body className="content">
                        <p>
                            <b className='titlecard'>LIBRARY MANAGEMENT</b>
                        </p>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="4" className="text-sm-right label-small">
                                    Username
                                </Form.Label>
                                <Col sm="8">
                                    <FormControl
                                        type="text"
                                        placeholder="Enter username"
                                        className="username"
                                        required
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="4" className="text-sm-right label-small">
                                    Password
                                </Form.Label>
                                <Col sm="8">
                                    <FormControl
                                        type="password"
                                        placeholder="*******"
                                        className="password"
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </Col>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                Login
                            </Button>
                        </Form>

                        <p className="mt-3 text-center">
                            Not registered?{' '}
                            <button
                                type="button"
                                onClick={handleNavigateToRegister}
                                className="btn btn-link p-0"
                                style={{ fontSize: 'inherit' }}
                            >
                                Register here
                            </button>
                        </p>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
};

export default Login;
