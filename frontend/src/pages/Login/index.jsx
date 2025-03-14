import React, { useState, useContext } from "react";
import axios from "axios";

import Footer from "../../components/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const clientData = { email, password };

            // Fazendo a requisição para o login
            const response = await axios.post('https://litshare-server.vercel.app/api/clients/login', clientData);

            // Verifica se o login foi bem-sucedido e salva o ID do usuário no localStorage
            if (response.data && response.data.user && response.data.user.id) {
                login(response.data.user.id); // Usa a função de login do contexto
                navigate('/');
            } else {
                toast.error('Login failed: User ID not found', {
                    position: "top-right",
                    autoClose: 3000,
                })
            }

            setEmail('');
            setPassword('');
        } catch (err) {
            toast.error('Login Failed: Invalid email or password', {
                position: "top-right",
                autoClose: 3000,
            })
        }
    };

    return (
        <div className="bg-light">
            <Container className="d-flex vh-100 justify-content-center">
                <Row className="justify-content-center align-self-center w-100">
                    <Col xs={12} lg={6}>
                        <div className="d-flex">
                            <FontAwesomeIcon icon={faBook} size="3x" className="d-sm-inline d-lg-none me-3" />
                            <FontAwesomeIcon icon={faBook} size="4x" className="d-none d-lg-inline me-3" />
                            <h1 className="display-4 text-body fw-bold">LitShare</h1>
                        </div>

                        <p className="lead">LitShare helps you connect and share your literary experiences with others.</p>
                    </Col>

                    <Col xs={12} lg={6}>
                        <Card className="shadow">
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="my-3">
                                        <Form.Control
                                            type="email"
                                            className="form-control py-2"
                                            placeholder="Email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="my-3">
                                        <Form.Control
                                            type="password"
                                            className="form-control py-2"
                                            placeholder="Password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Button variant="dark" type="submit" className="w-100 fw-bold fs-5">Login</Button>

                                    {/* 
                                        <Card className="mt-3 text-center">
                                            <Button variant="light" href="http://localhost:3000/auth/google" className="d-flex align-items-center justify-content-center">
                                                <FontAwesomeIcon icon={faGoogle} size="lg" className="me-2" /> Sign In with Google
                                            </Button>
                                        </Card>
                                    */}
                                </Form>

                                <hr className="my-4" />

                                <div className="d-flex justify-content-center">
                                    <p className="mb-0 me-2">Don't have an account?</p>
                                    <a className="text-decoration-none fw-bold" href="/register">Register</a>
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