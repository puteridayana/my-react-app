import React, { useState, useEffect } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import '../../styles/style.css';
import "bootstrap/dist/css/bootstrap.css";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ username: '', email: '', role: '' });
    const token = localStorage.getItem('token');

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_CALLBACK_URL}/users/fetchUsers`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                const error = await response.json();
                alert(error.message || 'Error fetching users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const addUser = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_CALLBACK_URL}/users/addUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                alert('User added successfully');
                fetchUsers();
                setUser({ username: '', email: '', role: '' });
            } else {
                const error = await response.json();
                alert(error.message || 'Error adding user');
            }
        } catch (error) {
            console.error('Error adding user:', error);
            alert('An error occurred while adding the user.');
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_CALLBACK_URL}/users/deleteUser/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();

            if (response.ok) {
                alert('User deleted successfully');
                setUsers(users.filter(user => user.id !== id));
            } else {
                alert(data.message || 'Error deleting user');
            }
        } catch (error) {
            console.error(error);
            alert('Error deleting user');
        }
    };

    return (
        <div>
            <h5 className="title">Add New User</h5>
            <div className="d-flex mb-2">
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    placeholder="Username"
                    onChange={handleChange}
                    className="form-control me-2"
                    style={{ flex: '1', minWidth: '200px' }}
                />
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    placeholder="Email"
                    onChange={handleChange}
                    className="form-control me-2"
                    style={{ flex: '1', minWidth: '200px' }}
                />
                <input
                    type="text"
                    name="role"
                    value={user.role}
                    placeholder="Role"
                    onChange={handleChange}
                    className="form-control me-2"
                    style={{ flex: '1', minWidth: '200px' }}
                />
                <button
                    onClick={addUser}
                    className="btn btn-primary"
                >
                    Add User
                </button>
            </div>

            <h5 className="title2">Users List</h5>
            <ListGroup>
                {users.length > 0 ? (
                    users.map((user) => (
                        <ListGroup.Item key={user.id} className="d-flex justify-content-between align-items-center">
                            <span>
                                {user.username} ({user.email}) - {user.role}
                            </span>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => deleteUser(user.id)}
                            >
                                Delete
                            </Button>
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item>No users found</ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
};

export default ManageUsers;
