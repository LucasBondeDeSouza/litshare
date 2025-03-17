import React, { useState } from "react";
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Modal, Button } from "react-bootstrap"
import Spinner from "../Spinner";

export default ({ onClose, bookId, title, review, rating, getBooks }) => {
    const [editReview, setEditReview] = useState(review)
    const [editRating, setEditRating] = useState(rating)
    const [loading, setLoading] = useState(false);

    const renderStars = (rating) => {
        return (
            <div className="text-center">
                {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={index < rating ? faStarSolid : faStarRegular} className="text-warning mx-1" />
                ))}
            </div>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const bookData = { editReview, editRating }
            await axios.put(`https://litshare-server.vercel.app/api/books/${bookId}`, bookData)
            toast.success("Book successfully published!", { position: "top-right", autoClose: 3000 });
            getBooks()
            onClose()
        } catch (err) {
            console.error(err);
            toast.error("Failed to edit book. Please try again.", { position: "top-right", autoClose: 3000 })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal show={true} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Book</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <h5>{title}</h5>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Review</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Write your review" value={editReview} onChange={(e) => setEditReview(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Rating</Form.Label>
                        <Form.Range value={editRating} min={0} max={5} step={1} onChange={(e) => setEditRating(Number(e.target.value))} />
                        {renderStars(editRating)}
                    </Form.Group>

                    <Button variant="dark" type="submit" className="w-100 fw-bold fs-5 d-flex align-items-center justify-content-center gap-2" disabled={loading}>
                        <Spinner loading={loading} />
                        Edit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}