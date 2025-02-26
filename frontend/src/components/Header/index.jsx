import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { Container, NavDropdown, Form, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import ModalForm from "../ModalForm";
import ListGroup from "../ListGroup";

export default () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({});
    const searchRef = useRef(null);
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        if (userId) {
            getUser();
        } else {
            console.error('No user ID found in localStorage');
        }
    }, []);
    
    const getUser = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/clients/home/${userId}`);
            setData(response.data);
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    };

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setResults([]); // Esconde a lista quando clica fora
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClick = (social_handle, title) => {
        console.log(social_handle)
        console.log(title)
    }

    return (
        <div className="py-2 border-bottom bg-white sticky-top">
            <Container>
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <a href="/home" className="d-flex align-items-center mb-lg-0 link-body-emphasis text-decoration-none">
                        <FontAwesomeIcon icon={faBook} size="2x" className="me-2" />
                        <h1 className="display-6 mb-0 d-none d-lg-inline">LitShare</h1>
                    </a>

                    <Form ref={searchRef} className="col-10 col-lg-5 mb-lg-0 me-lg-3 position-relative">
                        <Form.Control
                            type="text"
                            placeholder="Search..."
                            aria-label="Search"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                handleSearch(e.target.value);
                            }}
                        />

                        <ListGroup input={search} datas={results} handleClick={handleClick} />
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
                                <NavDropdown.Item onClick={() => setShowModal(true)}>New Book</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="">Sign out</NavDropdown.Item>
                            </NavDropdown>
                        </Dropdown>
                    </div>
                </div>
            </Container>

            {showModal && <ModalForm onClose={() => setShowModal(false)} userId={userId} />}
        </div>
    );
}