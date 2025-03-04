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

export const deleteBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        await bookService.deleteBook(bookId);
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
        console.error("Error deleting book:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const editBook = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const { editReview, editRating } = req.body
        
        const editBook = await bookService.editBook(bookId, editReview, editRating)

        if (!editBook) {
            return res.status(404).json({ message: 'Book not found' })
        }

        res.status(200).json(editBook)
    } catch (err) {
        console.log('Error edit book: ', err)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

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

export const getBookSearch = async (req, res) => {
    try {
        const { title } = req.params;
        const { userId } = req.query
        const books = await bookService.getBookSearch(title, userId)
        res.status(200).json(books);
    } catch (err) {
        console.error("Error retrieving books:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getBookBySocialHandle = async (req, res) => {
    try {
        const { social_handle } = req.params
        const { userId } = req.query;
        const user = await bookService.getBookBySocialHandle(social_handle, userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

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

export const getBookMetrics = async (req, res) => {
    try {
        const { title } = req.params;
        const metrics = await bookService.getBookMetrics(title);
        console.log(title)
        res.status(200).json(metrics);
    } catch (err) {
        console.error("Error fetching book metrics:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
