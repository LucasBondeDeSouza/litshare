import React, { useState } from "react";
import axios from 'axios';

import { Container, NavDropdown, Form, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

export default ({ data }) => {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get(`http://localhost:3000/api/clients/search?q=${search}`)
            setResults(response.data);
        } catch (err) {
            console.error("Error search client:", err);
        }
    }

    return (
        <div className="py-2 py-lg-3 mb-3 border-bottom bg-white sticky-top">
            <Container>
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <a href="/home" className="d-flex align-items-center mb-lg-0 link-body-emphasis text-decoration-none">
                        <FontAwesomeIcon
                            icon={faBook}
                            size="2x"
                            className="d-sm-inline d-lg-none me-2"
                        />
                        <FontAwesomeIcon
                            icon={faBook}
                            size="3x"
                            className="d-none d-lg-inline me-2"
                        />
                        <h1 className="display-6 text-body fw-bold mb-0 d-none d-lg-inline">LitShare</h1>
                    </a>

                    <Form onSubmit={handleSearch} className="col-10 col-lg-5 mb-lg-0 me-lg-3">
                        <div className="input-group align-items-center">
                            <Form.Control
                                type="text"
                                placeholder="Search..."
                                aria-label="Search"
                                aria-describedby="button-addon2"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </Form>

                    <div className="d-none d-lg-flex align-items-center">
                        <Dropdown className="d-flex align-items-center gap-2">
                            {data.picture ? (
                                <img src={data.picture} alt="Profile Picture" className="rounded-circle" width="30" height="30" />
                            ) : (
                                <FontAwesomeIcon icon={faUser} />
                            )}

                            <NavDropdown title={data?.username ? (data.username.length > 14 ? data.username.slice(0, 14) + "..." : data.username) : 'User'} menuVariant="dark">
                                <NavDropdown.Item href="">My Profile</NavDropdown.Item>
                                <NavDropdown.Item href="">New Book</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="">Sign out</NavDropdown.Item>
                            </NavDropdown>
                        </Dropdown>
                    </div>
                </div>

                {results.length > 0 && (
                    <div className="search-results mt-3">
                        <ul className="list-group">
                            {results.map((user) => (
                                <li
                                    key={user.id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <span>{user.title ? user.title : user.username}</span>
                                </li>
                            ))}

                        </ul>
                    </div>
                )}
            </Container>
        </div>
    );
}