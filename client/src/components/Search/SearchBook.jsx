import React, { useState } from 'react';
import axios from 'axios';

const SearchBooks = () => {
    const [searchTitle, setSearchTitle] = useState(''); // For title search
    const [searchAuthor, setSearchAuthor] = useState(''); // For author search
    const [books, setBooks] = useState([]); // To store search results
    const [isLoading, setIsLoading] = useState(false); // For loading state
    const [error, setError] = useState(null); // For error messages

    const handleSearch = async () => {
        setError(null); // Clear any previous error
        if (!searchTitle && !searchAuthor) {
            setError('Please enter a title or author to search.');
            return;
        }

        setIsLoading(true); // Start loading
        try {
            const { data } = await axios.post('http://localhost:5000/search/searchBookResults', {
                searchTitle: searchTitle,
                searchAuthor: searchAuthor,
            });
            setBooks(data); // Update the state with the search results
        } catch (err) {
            console.error('Error searching books:', err);
            setError('Error searching books. Please try again later.');
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div>
            <h2>Search Books</h2>

            {/* Display error message if present */}
            {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

            {/* Input fields */}
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Search by Title"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px', width: '300px' }}
                />
                <input
                    type="text"
                    placeholder="Search by Author"
                    value={searchAuthor}
                    onChange={(e) => setSearchAuthor(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px', width: '300px' }}
                />
                <button onClick={handleSearch} style={{ padding: '5px 10px' }}>
                    Search
                </button>
            </div>

            {/* Results section */}
            <div style={{ marginTop: '20px' }}>
                {isLoading ? (
                    <p>Loading...</p>
                ) : books.length > 0 ? (
                    <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
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
                ) : (
                    <p>No books found</p>
                )}
            </div>
        </div>
    );
};

export default SearchBooks;
