import React, { useState } from "react";
import axios from "axios";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditModal from "../../EditModal";
import DeleteConfirmationModal from "../../DeleteConfirmationModal";

export default ({ book, bookId, getBooks }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`https://litshare-server.vercel.app/api/books/${bookId}`);
            toast.success("Book deleted successfully!", { position: "top-right", autoClose: 3000 });
            getBooks();
        } catch (error) {
            console.error("Error deleting book:", error);
            toast.error("There was an error deleting the book.", { position: "top-right", autoClose: 3000 });
        } finally {
            setShowDeleteModal(false); // Fecha o modal após a exclusão
        }
    };

    return (
        <>
            <Dropdown align="end">
                <Dropdown.Toggle as={Button} variant="link" className="p-0 text-dark">
                    <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-end shadow-lg rounded">
                    <Dropdown.Item
                        className="d-flex align-items-center text-danger"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        <FontAwesomeIcon icon={faTrash} className="me-2" /> Delete
                    </Dropdown.Item>

                    <Dropdown.Item
                        className="d-flex align-items-center text-primary"
                        onClick={() => setShowEditModal(true)}
                    >
                        <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {/* Modal de Confirmação para Exclusão */}
            {showDeleteModal && (
                <DeleteConfirmationModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDelete}
                    title={book.title}
                />
            )}

            {/* Modal de Edição */}
            {showEditModal && (
                <EditModal
                    onClose={() => setShowEditModal(false)}
                    bookId={bookId}
                    title={book.title}
                    review={book.review}
                    rating={book.rating}
                    getBooks={getBooks}
                />
            )}
        </>
    );
};