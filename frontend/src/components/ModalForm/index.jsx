import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

import ListGroup from "../ListGroup";

export default ({ onClose, userId }) => {
    const [title, setTitle] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [books, setBooks] = useState([]);
    const listRef = useRef(null);
    const modalRef = useRef(null); // Referência para o modal

    useEffect(() => {
        if (title) {
            axios.get(`https://openlibrary.org/search.json?title=${title}`)
                .then(response => {
                    setBooks(response.data.docs);
                })
                .catch(error => {
                    console.error("Error fetching books:", error);
                });
        } else {
            setBooks([]);
        }
    }, [title]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                modalRef.current && !modalRef.current.contains(event.target) && 
                listRef.current && !listRef.current.contains(event.target)
            ) {
                setBooks([]); // Esconde a lista se clicar fora do modal e da lista
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bookData = { title, review, rating, userId };
            await axios.post("http://localhost:3000/api/books/newBook", bookData);

            setTitle("");
            setReview("");
            setRating(0);
            onClose();
        } catch (err) {
            console.error("Error adding book:", err.response ? err.response.data : err.message)
        }
    }

    const handleBookClick = (bookTitle) => {
        setTitle(bookTitle);
        setBooks([]);
    };

    const renderStars = (rating) => {
        return (
            <div className="text-center">
                {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={index < rating ? faStarSolid : faStarRegular} className="text-warning mx-1" />
                ))}
            </div>
        );
    };

    return (
        <Modal show={true} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>New Book</Modal.Title>
            </Modal.Header>
            
            <Modal.Body ref={modalRef}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" style={{ position: "relative" }}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter book title" value={title} required onChange={(e) => setTitle(e.target.value)} />
                        
                        <div ref={listRef}>
                            <ListGroup input={title} datas={books} handleClick={handleBookClick} />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Review</Form.Label>
                        <Form.Control as="textarea" placeholder="Write your review" value={review} required onChange={(e) => setReview(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Rating</Form.Label>
                        <Form.Range value={rating} min={0} max={5} step={1} onChange={(e) => setRating(Number(e.target.value))} />
                        {renderStars(rating)}
                    </Form.Group>

                    <Button type="submit" className="btn btn-dark w-100 fw-bold fs-5">Add</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}