import React, { useState, useEffect } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import '../../styles/style.css';
import "bootstrap/dist/css/bootstrap.css";

const ManageBooks = () => {
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState({ title: '', author: '', genre: '', publicationYear: '' });
    const [editing, setEditing] = useState(false);
    const [editBookId, setEditBookId] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_CALLBACK_URL}/manage/fetchBooks`, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        alert('Session expired. Please log in again.');
                        window.location.href = '/login';
                    } else {
                        throw new Error('Failed to fetch books');
                    }
                }

                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error(error);
                alert('Error fetching books');
            }
        };
        fetchBooks();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const addBook = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_CALLBACK_URL}/manage/addBook`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(book),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Book added successfully');
                setBooks([...books, { id: data.id, ...book }]);
                setBook({ title: '', author: '', genre: '', publicationYear: '' });
            } else {
                alert(data.message || 'Error adding book');
            }
        } catch (error) {
            console.error(error);
            alert('Error adding book');
        }
    };

    const updateBook = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_CALLBACK_URL}/manage/updateBook/${editBookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(book),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Book updated successfully');
                setBooks(books.map((b) => (b.id === editBookId ? { ...b, ...book } : b)));
                setBook({ title: '', author: '', genre: '', publicationYear: '' });
                setEditing(false);
                setEditBookId(null);
            } else {
                alert(data.message || 'Error updating book');
            }
        } catch (error) {
            console.error(error);
            alert('Error updating book');
        }
    };

    const deleteBook = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_CALLBACK_URL}/manage/deleteBook/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();

            if (response.ok) {
                alert('Book deleted successfully');
                setBooks(books.filter((book) => book.id !== id));
            } else {
                alert(data.message || 'Error deleting book');
            }
        } catch (error) {
            console.error(error);
            alert('Error deleting book');
        }
    };

    return (
        <div>
            <h5 className="title">Books List</h5>
            <ListGroup>
                {books.map((book) => (
                    <ListGroup.Item key={book.id} className="d-flex justify-content-between align-items-center">
                        <span>
                            {book.title} by {book.author} - {book.genre}, {book.publicationYear}
                        </span>
                        <span>
                            <Button
                                variant="info"
                                size="sm"
                                className="me-2"
                                onClick={() => {
                                    setEditing(true);
                                    setEditBookId(book.id);
                                    setBook(book);
                                }}
                            >
                                Edit
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => deleteBook(book.id)}>
                                Delete
                            </Button>
                        </span>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <h5 className="title2">{editing ? 'Update Book' : 'Add New Book'}</h5>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', width: '100%' }}>
                <input
                    type="text"
                    name="title"
                    value={book.title}
                    placeholder="Book Title"
                    onChange={handleChange}
                    style={{ flex: '1', minWidth: '200px' }}
                    className="form-control"
                />
                <input
                    type="text"
                    name="author"
                    value={book.author}
                    placeholder="Author"
                    onChange={handleChange}
                    style={{ flex: '1', minWidth: '200px' }}
                    className="form-control"
                />
                <input
                    type="text"
                    name="genre"
                    value={book.genre}
                    placeholder="Genre"
                    onChange={handleChange}
                    style={{ flex: '1', minWidth: '200px' }}
                    className="form-control"
                />
                <input
                    type="text"
                    name="publicationYear"
                    value={book.publicationYear}
                    placeholder="Publication Year"
                    onChange={handleChange}
                    style={{ flex: '1', minWidth: '200px' }}
                    className="form-control"
                />
                <button
                    onClick={editing ? updateBook : addBook}
                    className={`btn ${editing ? 'btn-warning' : 'btn-primary'}`}
                    style={{ alignSelf: 'flex-end' }}
                >
                    {editing ? 'Update Book' : 'Add Book'}
                </button>
            </div>
        </div>
    );
};

export default ManageBooks;
