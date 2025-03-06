import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

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
            }

            const response = await axios.post("http://localhost:3000/api/clients/register", clientData);

            if (response.data && response.data.user && response.data.user.id) {
                localStorage.setItem('userId', response.data.user.id); // Salva o ID do usuário
                navigate('/home');
            } else {
                alert('Login failed: User ID not found');
            }

            setName("");
            setSocialHandle("");
            setEmail("");
            setPassword("");
        } catch (err) {
            console.error("Error adding client:", err);
        }
    };

    return (
        <div className="bg-light">
            <div className="container d-flex vh-100 justify-content-center">
                <div className="row justify-content-center align-self-center w-100">
                    <div className="col-12 col-lg-6">
                        <div className="card shadow p-2">
                            <div className="card-body">
                                <div className="d-flex justify-content-center align-items-center">
                                    <FontAwesomeIcon
                                        icon={faBook}
                                        size="2x"
                                        className="d-sm-inline d-lg-none me-3"
                                    />
                                    <FontAwesomeIcon
                                        icon={faBook}
                                        size="3x"
                                        className="d-none d-lg-inline me-3"
                                    />
                                    <h1 className="display-6 text-body fw-bold">LitShare</h1>
                                </div>

                                <form method="dialog" onSubmit={handleSubmit}>
                                    <div className="form-group my-3">
                                        <input
                                            type="text"
                                            className="form-control py-2"
                                            placeholder="Name"
                                            value={name}
                                            required
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon1">@</span>
                                        <input
                                            type="text"
                                            className="form-control py-2"
                                            placeholder=""
                                            value={social_handle}
                                            required
                                            onChange={(e) => {
                                                // Impedir espaços no social_handle
                                                const newValue = e.target.value.replace(/\s/g, "");
                                                setSocialHandle(newValue);
                                            }}
                                        />
                                    </div>

                                    <div className="form-group my-3">
                                        <input
                                            type="email"
                                            className="form-control py-2"
                                            placeholder="Email"
                                            value={email}
                                            required
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group my-3">
                                        <input
                                            type="password"
                                            className="form-control py-2"
                                            placeholder="Password"
                                            value={password}
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <button className="btn btn-dark w-100 fw-bold fs-5">
                                        Register
                                    </button>

                                    <div className="card mt-3">
                                        <div className="d-grid col-12">
                                            <a href="http://localhost:3000/auth/google" className="btn btn-block">
                                                <FontAwesomeIcon icon={faGoogle} size="lg" className="me-2" />
                                                Sign Up with Google
                                            </a>
                                        </div>
                                    </div>
                                </form>

                                <hr className="my-4" />

                                <div className="d-flex justify-content-center">
                                    <p className="mb-0 me-2">Have an account?</p>
                                    <a className="text-decoration-none fw-bold" href="/" role="button">
                                        Login
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};