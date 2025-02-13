import React, { useState } from "react";

export default ({ onSubmit }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const clientData = { name, email, password }
            await onSubmit(clientData)
        } catch (err) {
            console.error('Error adding client', err)
        }
    }

    return (
        <form method="dialog" onSubmit={handleSubmit} >
            <label className="input input-bordered my-4 flex items-center gap-2 w-full">
                Name
                <input type="text" className="grow" value={name} required onChange={(e) => setName(e.target.value)} />
            </label>

            <label className="input input-bordered my-4 flex items-center gap-2 w-full">
                Email
                <input type="email" className="grow" value={email} required onChange={(e) => setEmail(e.target.value)} />
            </label>

            <label className="input input-bordered my-4 flex items-center gap-2 w-full">
                Password
                <input type="password" className="grow" value={password} required onChange={(e) => setPassword(e.target.value)} />
            </label>

            <button className="btn btn-sm btn-primary">
                Register
            </button>
        </form >
    )
}