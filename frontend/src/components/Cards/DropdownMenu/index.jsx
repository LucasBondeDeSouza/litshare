import React, { useState } from "react";
import axios from "axios";
import { Button, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import EditModal from "../../EditModal";

export default ({ book, bookId, getBooks }) => {
    const [showModal, setShowModal] = useState(false)
    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/books/${id}`);
            getBooks()
        } catch (error) {
            console.error("Error deleting book:", error);
            alert("There was an error deleting the book.");
        }
    };

    return (
        <>
            <Dropdown align="end">
                <Dropdown.Toggle as={Button} variant="link" className="p-0 text-dark">
                    <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-end shadow-lg rounded">
                    <Dropdown.Item className="d-flex align-items-center text-danger" onClick={() => handleDelete(bookId)}>
                        <FontAwesomeIcon icon={faTrash} className="me-2" /> Delete
                    </Dropdown.Item>

                    <Dropdown.Item className="d-flex align-items-center text-primary" onClick={() => setShowModal(true)}>
                        <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {showModal && <EditModal onClose={() => setShowModal(false)} bookId={bookId} title={book.title} review={book.review} rating={book.rating} getBooks={getBooks} />}
        </>
    );
};