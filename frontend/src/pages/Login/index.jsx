import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const clientData = { email, password };
            await axios.post('http://localhost:3000/api/clients/login', clientData);

            setEmail('');
            setPassword('');
            navigate('/home');
        } catch (err) {
            console.log('Error login client', err);
            alert('Login Failed');
        }
    };

    return (
            <div className="bg-light">
                <div className="container d-flex vh-100 justify-content-center">
                    <div className="row justify-content-center align-self-center w-100">
                        <div className="col-12 col-lg-6">
                            <div className="d-flex">
                                <FontAwesomeIcon icon={faBook} size="3x" className="d-sm-inline d-lg-none me-3" />
                                <FontAwesomeIcon icon={faBook} size="4x" className="d-none d-lg-inline me-3" />
                                <h1 className="display-4 text-body fw-bold">LitShare</h1>
                            </div>

                            <p className="lead">LitShare helps you connect and share your literary experiences with others.</p>
                        </div>

                        <div className="col-12 col-lg-6">
                            <div className="card shadow">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group my-3">
                                            <input
                                                type="email"
                                                className="form-control py-2"
                                                placeholder="Email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group my-3">
                                            <input
                                                type="password"
                                                className="form-control py-2"
                                                placeholder="Password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>

                                        <button className="btn btn-dark w-100 fw-bold fs-5">Login</button>
                                    </form>

                                    <hr className="my-4" />

                                    <div className="d-flex justify-content-center">
                                        <p className="mb-0 me-2">Don't have an account?</p>
                                        <a className="text-decoration-none fw-bold" href="/register">Register</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};