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