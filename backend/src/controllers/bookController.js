import * as bookService from "../services/bookServices.js"

export const addBooks = async (req, res) => {
    try {
        const { title, review, rating, userId } = req.body;
        const book = await bookService.addBook(title, review, rating, userId);
        res.status(201).json(book);
    } catch (err) {
        console.log('Error adding book:', err.message);
        
        if (err.message === "book already exists") {
            return res.status(409).json({ message: "Livro já cadastrado" });
        }

        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getBooks = async (req, res) => {
    try {
        const { id } = req.params;
        const books = await bookService.getBooks(id);
        res.status(200).json(books);
    } catch (err) {
        console.error("Error retrieving books:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const toggleLike = async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const result = await bookService.toggleLike(userId, bookId);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error toggling like:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getLikers = async (req, res) => {
    try {
        const { bookId } = req.params;
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const likers = await bookService.getLikers(userId, bookId);
        res.status(200).json(likers);
    } catch (err) {
        console.error("Error retrieving likers:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};