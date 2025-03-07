import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default () => {
    const [name, setName] = useState("");
    const [social_handle, setSocialHandle] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const clientData = {
                name,
                social_handle: `@${social_handle}`,
                email,
                password
            };

            await axios.post("http://localhost:3000/api/clients/register", clientData);
            
            toast.success("Registration successful! Redirecting to login...", {
                position: "top-right",
                autoClose: 3000,
            });

            setTimeout(() => navigate("/login"), 3000);

            setName("");
            setSocialHandle("");
            setEmail("");
            setPassword("");
        } catch (err) {
            console.error("Error adding client:", err);
            toast.error("Registration failed. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <Container fluid className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
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
                                    <Form.Control type="text" placeholder="Name" value={name} required onChange={(e) => setName(e.target.value)} />
                                </Form.Group>
                                
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>@</InputGroup.Text>
                                    <Form.Control type="text" placeholder="" value={social_handle} required onChange={(e) => setSocialHandle(e.target.value.replace(/\s/g, ""))} />
                                </InputGroup>
                                
                                <Form.Group className="mb-3">
                                    <Form.Control type="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                    <Form.Control type="password" placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                                
                                <Button variant="dark" type="submit" className="w-100 fw-bold fs-5">Register</Button>
                            </Form>
                            
                            <Card className="mt-3 text-center">
                                <Button variant="light" href="http://localhost:3000/auth/google" className="d-flex align-items-center justify-content-center">
                                    <FontAwesomeIcon icon={faGoogle} size="lg" className="me-2" /> Sign Up with Google
                                </Button>
                            </Card>
                            
                            <hr className="my-4" />
                            
                            <div className="text-center">
                                <p className="mb-0">Have an account? <a href="/" className="fw-bold text-decoration-none">Login</a></p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
};