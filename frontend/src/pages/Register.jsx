import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

export default ({ onSubmit }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const clientData = { name, email, password }
            await onSubmit(clientData)

            setName('');
            setEmail('');
            setPassword('');
        } catch (err) {
            console.error('Error adding client', err)
        }
    }

    return (
        <div className="col-12 col-lg-6">
            <div className="card shadow p-2">
                <div className="card-body">
                    <div className="d-flex justify-content-center align-items-center">
                        <FontAwesomeIcon icon={faBook} size="2x" className="d-sm-inline d-lg-none me-3" />
                        <FontAwesomeIcon icon={faBook} size="3x" className="d-none d-lg-inline me-3" />
                        <h1 className="display-6 text-body fw-bold">LitShare</h1>
                    </div>

                    <form method="dialog" onSubmit={handleSubmit}>
                        <div className="form-group my-3">
                            <input type="text" className="form-control py-2" placeholder="Name" value={name} required onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="form-group my-3">
                            <input type="email" className="form-control py-2" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="form-group my-3">
                            <input type="password" className="form-control py-2" placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button class="btn btn-dark w-100 fw-bold fs-5">Register</button>
                    </form>

                    <hr class="my-4"/>
  
                    <div class="d-flex justify-content-center">
                        <p class="mb-0 me-2">Have an account?</p>
                        <a class="text-decoration-none fw-bold" href="/" role="button">Login</a>
                    </div>
                </div>
            </div>
        </div>
    )
}