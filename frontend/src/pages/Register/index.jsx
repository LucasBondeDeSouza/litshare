import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";

export default () => {
    const [formData, setFormData] = useState({
        name: "",
        social_handle: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const isValidPassword = (password) => password.length >= 6;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        const { name, social_handle, email, password } = formData;
        if (!isValidEmail(email)) {
            return toast.error("Please enter a valid email.");
        }
        if (!isValidPassword(password)) {
            return toast.error("Password must be at least 6 characters long.");
        }

        setLoading(true);
        try {
            const formattedSocialHandle = social_handle.startsWith("@") ? social_handle : `@${social_handle}`;
            const clientData = { name, social_handle: formattedSocialHandle, email, password };

            await axios.post("https://litshare-server.vercel.app/api/clients/register", clientData);

            toast.success("Registration successful! Redirecting to login...", {
                position: "top-right",
                autoClose: 3000,
            });

            setTimeout(() => navigate("/login"), 3000);

            setFormData({ name: "", social_handle: "", email: "", password: "" });
        } catch (err) {
            console.error("Error adding client:", err);
            toast.error("Email or @ already exists. Try Again", {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-light">
            <Container className="min-vh-100 d-flex justify-content-center align-items-center">
                <Row className="justify-content-center w-100">
                    <Col xs={12} lg={6}>
                        <Card className="shadow p-2">
                            <Card.Body>
                                <div className="d-flex align-items-center justify-content-center mb-3">
                                    <FontAwesomeIcon icon={faBook} size="3x" className="me-3" />
                                    <h1 className="display-6 fw-bold m-0">LitShare</h1>
                                </div>
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Control 
                                            type="text" 
                                            name="name" 
                                            placeholder="Name" 
                                            value={formData.name} 
                                            required 
                                            onChange={handleChange} 
                                        />
                                    </Form.Group>
                                    
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>@</InputGroup.Text>
                                        <Form.Control 
                                            type="text" 
                                            name="social_handle" 
                                            placeholder="Username" 
                                            value={formData.social_handle} 
                                            required 
                                            onChange={(e) => setFormData({ ...formData, social_handle: e.target.value.replace(/\s/g, "") })}
                                        />
                                    </InputGroup>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Control 
                                            type="email" 
                                            name="email" 
                                            placeholder="Email" 
                                            value={formData.email} 
                                            required 
                                            isInvalid={formData.email && !isValidEmail(formData.email)}
                                            onChange={handleChange} 
                                        />
                                        <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Control 
                                            type="password" 
                                            name="password" 
                                            placeholder="Password" 
                                            value={formData.password} 
                                            required 
                                            isInvalid={formData.password && !isValidPassword(formData.password)}
                                            onChange={handleChange} 
                                        />
                                        <Form.Control.Feedback type="invalid">Password must be at least 6 characters long.</Form.Control.Feedback>
                                    </Form.Group>
                                    
                                    <Button variant="dark" type="submit" className="w-100 fw-bold fs-5 d-flex align-items-center justify-content-center gap-2" disabled={loading}>
                                        <Spinner loading={loading} /> Register
                                    </Button>
                                </Form>
                                
                                <hr className="my-4" />
                                
                                <div className="text-center">
                                    <p className="mb-0">
                                        Have an account? <Link to="/login" className="fw-bold text-decoration-none">Login</Link>
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
};