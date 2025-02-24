const express = require('express');
const router = express.Router();

// Sample data for books (this would usually come from a database)
let books = [
    { "book_id": "101", "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "genre": "Fiction", "year": 1925, "copies": 5 },
    { "book_id": "102", "title": "1984", "author": "George Orwell", "genre": "Dystopian", "year": 1949, "copies": 4 }
];

// Create a new book
router.post('/books', (req, res) => {
    const { book_id, title, author, genre, year, copies } = req.body;

    // Validate the input
    if (!book_id || !title || !author || !genre || !year || !copies) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Add the new book to the library
    const newBook = { book_id, title, author, genre, year, copies };
    books.push(newBook);
    res.status(201).json(newBook);  // Return the added book
});

// Get all books
router.get('/books', (req, res) => {
    res.status(200).json(books);  // Return all books
});

// Get a specific book by ID
router.get('/books/:id', (req, res) => {
    const book = books.find(b => b.book_id === req.params.id);
    if (book) {
        res.status(200).json(book);  // Return the book if found
    } else {
        res.status(404).json({ error: "Book not found" });  // Error if book not found
    }
});

// Update book information
router.put('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.book_id === req.params.id);
    if (bookIndex !== -1) {
        const { title, author, genre, year, copies } = req.body;

        // Update book details
        books[bookIndex] = {
            ...books[bookIndex],
            title: title || books[bookIndex].title,
            author: author || books[bookIndex].author,
            genre: genre || books[bookIndex].genre,
            year: year || books[bookIndex].year,
            copies: copies || books[bookIndex].copies
        };

        res.status(200).json(books[bookIndex]);  // Return the updated book
    } else {
        res.status(404).json({ error: "Book not found" });  // Error if book not found
    }
});

// Delete a book
router.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.book_id === req.params.id);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);  // Remove the book from the array
        res.status(200).json({ message: "Book deleted successfully" });  // Success message
    } else {
        res.status(404).json({ error: "Book not found" });  // Error if book not found
    }
});

module.exports = router;  // Export the router to use in the main server file
