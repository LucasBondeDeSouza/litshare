import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom"
import { Container, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import ModalForm from "../ModalForm";

export default () => {
    const [data, setData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate();

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

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/api/clients/logout');  // Chama a rota de logout no backend
            localStorage.removeItem('userId');  // Remove o ID do usuário armazenado no localStorage
            navigate('/login');  // Redireciona para a página de login
        } catch (err) {
            console.error("Erro ao realizar logout:", err);
        }
    }

    return (
        <div className="py-2 bg-white sticky-bottom d-lg-none border-top">
            <Container>
                <div className="d-flex align-items-center justify-content-around">
                    <a href="/" className="text-decoration-none text-reset">
                        <FontAwesomeIcon icon={faHouse} className="fs-2" />
                    </a>

                    <FontAwesomeIcon icon={faPlus} className="fs-2" onClick={() => setShowModal(true)} />

                    <Dropdown drop="up" className="d-flex align-items-center gap-2">
                        <Dropdown.Toggle as="div" id="dropdown-basic" className="d-flex align-items-center">
                            {data.picture ? (
                                <img src={data.picture} alt="Profile Picture" className="profile-navigation-picture" />
                            ) : (
                                <FontAwesomeIcon icon={faUserCircle} className="fs-2" />
                            )}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href={`/user/${data.social_handle}`}>My Profile</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Container>

            {showModal && <ModalForm onClose={() => setShowModal(false)} userId={userId} />}
        </div>
    )
}