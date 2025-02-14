import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

export default ({ onSubmit }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const clientData = {email, password}
            await onSubmit(clientData)
        } catch (err) {
            console.log('Error login client', err)
        }
    }

    return (
        <>
            <div className="col-12 col-lg-6">
                <div className="d-flex">
                    <FontAwesomeIcon icon={faBook} size="3x" className="d-sm-inline d-lg-none me-3" />
                    <FontAwesomeIcon icon={faBook} size="4x" className="d-none d-lg-inline me-3" />
                    <h1 className="display-4 text-body fw-bold">LitShare</h1>
                </div>

                <p class="lead">LitShare helps you connect and share your literary experiences with others.</p>
            </div>

            <div class="col-12 col-lg-6">
                <div className="card shadow">
                    <div className="card-body">
                        <form method="dialog" onSubmit={handleSubmit}>
                            <div className="form-group my-3">
                                <input type="email" name="username" class="form-control py-2" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="form-group my-3">
                                <input type="password" name="password" class="form-control py-2" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <button class="btn btn-dark w-100 fw-bold fs-5">Login</button>
                        </form>

                        <hr class="my-4" />
  
                        <div class="d-flex justify-content-center">
                            <p class="mb-0 me-2">Don't have an account?</p>
                            <a class="text-decoration-none fw-bold" href="/register" role="button">Register</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}