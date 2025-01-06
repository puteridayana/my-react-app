import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import '../../styles/style.css';
import "bootstrap/dist/css/bootstrap.css";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
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

    return (
        <div>
            <h5 className="title2">Users List</h5>
            <ListGroup>
                {users.length > 0 ? (
                    users.map((user) => (
                        <ListGroup.Item key={user.id} className="d-flex justify-content-between align-items-center">
                            <span>
                                {user.username} ({user.email}) - {user.role}
                            </span>
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
