import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListGroup from "../ListGroup";

export default ({ onClose, userId, social_handle, getBooks }) => {
    const [title, setTitle] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [olid, setOlid] = useState('')
    const [books, setBooks] = useState([]);
    const listRef = useRef(null);
    const modalRef = useRef(null);
    const navigate = useNavigate(); // Hook para redirecionamento

    useEffect(() => {
        const fetchBooks = async () => {
            if (title.length > 2) { // Só busca quando o usuário digitar pelo menos 3 caracteres
                try {
                    const response = await axios.get(`https://openlibrary.org/search.json?title=${title}&limit=5`);
                    
                    // Formata os dados antes de armazená-los
                    const bookResults = response.data.docs.map(book => ({
                        key: book.key,
                        title: book.title,
                        author_name: book.author_name || ["Autor Desconhecido"],
                        cover_i: book.cover_i || null
                    }));

                    setBooks(bookResults);
                } catch (error) {
                    console.error("Erro ao buscar livros:", error);
                }
            } else {
                setBooks([]); // Limpa a lista se o input for apagado
            }
        };

        fetchBooks();
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
            const bookData = { title, review, rating, olid, userId };
            await axios.post("http://localhost:3000/api/books/newBook", bookData);
            toast.success("Book added successfully!", { position: "top-right", autoClose: 3000 });

            setTitle("");
            setReview("");
            setRating(0);
            setOlid("")
            onClose();

            getBooks()
            navigate(`/user/${social_handle}`);
        } catch (err) {
            console.error("Erro ao adicionar livro:", err.response ? err.response.data : err.message);
            toast.error("You already have this book registered. Try Another :)", { position: "top-right", autoClose: 3000 });
        }
    };

    const handleBookClick = (_, bookTitle, bookOlid) => {
        setTitle(bookTitle);
        setOlid(bookOlid);
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
                    {/* Campo de busca e lista de sugestões */}
                    <Form.Group className="mb-3" style={{ position: "relative" }}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter book title" 
                            value={title} 
                            required 
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        {/* Exibição da lista de sugestões */}
                        <div ref={listRef}>
                            <ListGroup input={title} datas={books} handleClick={handleBookClick} />
                        </div>
                    </Form.Group>

                    {/* Campo de avaliação */}
                    <Form.Group className="mb-3">
                        <Form.Label>Review</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            placeholder="Write your review" 
                            value={review} 
                            required 
                            onChange={(e) => setReview(e.target.value)}
                        />
                    </Form.Group>

                    {/* Seletor de estrelas */}
                    <Form.Group className="mb-3">
                        <Form.Label>Rating</Form.Label>
                        <Form.Range 
                            value={rating} 
                            min={0} 
                            max={5} 
                            step={1} 
                            onChange={(e) => setRating(Number(e.target.value))} 
                        />
                        {renderStars(rating)}
                    </Form.Group>

                    <Button type="submit" className="btn btn-dark w-100 fw-bold fs-5">
                        Add
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};