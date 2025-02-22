import * as bookService from "../services/bookServices.js"

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
        const { userId, bookId } = req.params;
        const likers = await bookService.getLikers(userId, bookId);
        console.log(likers)
        res.status(200).json(likers);
    } catch (err) {
        console.error("Error retrieving likers:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
