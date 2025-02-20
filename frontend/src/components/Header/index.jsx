import React, { useState } from "react";
import axios from 'axios';
import { Container, NavDropdown, Form, Dropdown, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faSearch, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default ({ data }) => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (query) => {
        if (!query.trim()) {
            setResults([]);
            return;
        }
        try {
            const response = await axios.get(`http://localhost:3000/api/clients/search?q=${query}`);
            setResults(response.data);
        } catch (err) {
            console.error("Error search client:", err);
        }
    };

    return (
        <div className="py-2 border-bottom bg-white sticky-top">
            <Container>
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <a href="/home" className="d-flex align-items-center mb-lg-0 link-body-emphasis text-decoration-none">
                        <FontAwesomeIcon icon={faBook} size="2x" className="me-2" />
                        <h1 className="display-6 mb-0 d-none d-lg-inline">LitShare</h1>
                    </a>

                    <Form onSubmit={handleSearch} className="col-10 col-lg-5 mb-lg-0 me-lg-3 position-relative">
                        <Form.Control
                            type="text"
                            placeholder="Search..."
                            aria-label="Search"
                            aria-describedby="button-addon2"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                handleSearch(e.target.value);
                            }}
                        />

                        {results.length > 0 && (
                            <ListGroup className="position-absolute w-100 listgroup">
                                {results.map((user) => (
                                    <ListGroup.Item key={user.id} className="d-flex justify-content-between align-items-center py-3">
                                        {user.title ? (
                                            <span>{user.title}</span>
                                        ) : (
                                            <div className="d-flex align-items-center gap-2">
                                                {user.picture ? (
                                                    <img src={user.picture} alt={user.username} className="list-picture" />
                                                ) : (
                                                    <FontAwesomeIcon icon={faUserCircle} size="2x" />
                                                )}

                                                <span>{user.username}</span>
                                            </div>
                                        )}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </Form>

                    <div className="d-none d-lg-flex align-items-center">
                        <Dropdown className="d-flex align-items-center gap-2">
                            {data.picture ? (
                                <img src={data.picture} alt="Profile Picture" className="dropdown-picture" />
                            ) : (
                                <FontAwesomeIcon icon={faUserCircle} size="2x" />
                            )}

                            <NavDropdown className="fs-5" title={data?.username ? (data.username.length > 14 ? data.username.slice(0, 14) + "..." : data.username) : 'User'} menuVariant="light">
                                <NavDropdown.Item href="">My Profile</NavDropdown.Item>
                                <NavDropdown.Item href="">New Book</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="">Sign out</NavDropdown.Item>
                            </NavDropdown>
                        </Dropdown>
                    </div>
                </div>
            </Container>
        </div>
    );
}