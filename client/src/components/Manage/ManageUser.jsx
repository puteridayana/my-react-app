import React, { useState, useEffect } from 'react';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ username: '', email: '', role: '' });

    // Fetch users from the backend
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/users/fetchUsers');
            const data = await response.json();
            setUsers(data);
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

    // Add user
    const addUser = async () => {
        try {
            const response = await fetch('http://localhost:5000/users/addUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                alert('User added successfully');
                fetchUsers(); // Refetch updated user list
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

    return (
        <div>
            <h2>Add New User</h2>
            <input
                type="text"
                name="username"
                value={user.username}
                placeholder="Username"
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                value={user.email}
                placeholder="Email"
                onChange={handleChange}
            />
            <input
                type="text"
                name="role"
                value={user.role}
                placeholder="Role"
                onChange={handleChange}
            />
            <button onClick={addUser}>Add User</button>

            <h2>Users List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.username} ({user.email}) - {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageUsers;
