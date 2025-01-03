import React, { useState } from 'react';
import axios from 'axios';

const SearchBooks = () => {
    const [searchTitle, setSearchTitle] = useState('');
    const [searchAuthor, setSearchAuthor] = useState('');
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setError(null);
        if (!searchTitle && !searchAuthor) {
            setError('Please enter a title or author to search.');
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_CALLBACK_URL}/search/searchBookResults`, {
                searchTitle: searchTitle,
                searchAuthor: searchAuthor,
            });
            setBooks(data);
        } catch (err) {
            console.error('Error searching books:', err);
            setError('Error searching books. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h5 className="title">Search Books</h5>
            {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
            <div className="d-flex mb-3">
                <input
                    type="text"
                    placeholder="Search by Title"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    className="form-control me-2"
                    style={{ maxWidth: '300px' }}
                />
                <input
                    type="text"
                    placeholder="Search by Author"
                    value={searchAuthor}
                    onChange={(e) => setSearchAuthor(e.target.value)}
                    className="form-control me-2"
                    style={{ maxWidth: '300px' }}
                />
                <button
                    onClick={handleSearch}
                    className="btn btn-primary"
                    style={{ height: '40px' }}
                >
                    Search
                </button>
            </div>
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : books.length > 0 ? (
                    <div className="card">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Genre</th>
                                        <th>Publication Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books.map((book) => (
                                        <tr key={book.id}>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{book.genre}</td>
                                            <td>{book.publication_year}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <p>No books found</p>
                )}
            </div>
        </div>
    );
};

export default SearchBooks;
