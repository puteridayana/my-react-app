import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

const ManageBooks = () => {
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState({ title: '', author: '', genre: '', publicationYear: '' });
    const [editing, setEditing] = useState(false);
    const [editBookId, setEditBookId] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('http://localhost:5000/manage/fetchBooks');
            const data = await response.json();
            setBooks(data);
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
        const response = await fetch('http://localhost:5000/manage/addBook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
    };

    const updateBook = async () => {
        const response = await fetch('http://localhost:5000/manage/updateBook', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...book, bookId: editBookId }),
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
    };

    const deleteBook = async (id) => {
        const response = await fetch(`http://localhost:5000/manage/deleteBook/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (response.ok) {
            alert('Book deleted successfully');
            setBooks(books.filter((book) => book.id !== id));
        } else {
            alert(data.message || 'Error deleting book');
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">{editing ? 'Update Book' : 'Add New Book'}</h2>
            <Form>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Book Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={book.title}
                                placeholder="Enter book title"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                name="author"
                                value={book.author}
                                placeholder="Enter author name"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formGenre">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                type="text"
                                name="genre"
                                value={book.genre}
                                placeholder="Enter genre"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formPublicationYear">
                            <Form.Label>Publication Year</Form.Label>
                            <Form.Control
                                type="text"
                                name="publicationYear"
                                value={book.publicationYear}
                                placeholder="Enter publication year"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant={editing ? 'warning' : 'primary'} onClick={editing ? updateBook : addBook}>
                    {editing ? 'Update Book' : 'Add Book'}
                </Button>
            </Form>

            <h2 className="text-center mt-4">Books List</h2>
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
        </Container>
    );
};

export default ManageBooks;
