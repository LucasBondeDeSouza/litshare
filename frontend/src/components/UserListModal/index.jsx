import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import FollowButton from "../FollowButton";
import { Link } from "react-router-dom";

export default ({ show, onHide, titleModal, datas, userId }) => {
    const [search, setSearch] = useState("");

    const filteredData = datas.filter((data) =>
        data.username.toLowerCase().includes(search.toLowerCase()) ||
        data.social_handle.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{titleModal}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="modal-list">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="form-control mb-3"
                />

                {filteredData.length > 0 ? (
                    <div className="d-flex flex-column">
                        {filteredData.map((data) => (
                            <div key={data.id} className="d-flex align-items-center justify-content-between p-2 modal-line">
                                <div className="d-flex align-items-center gap-2">
                                    {data.picture ? (
                                        <img src={data.picture} alt="Profile Picture" className="dropdown-picture" />
                                    ) : (
                                        <FontAwesomeIcon icon={faUserCircle} size="2x" />
                                    )}
                                    <Link to={`/user/${data.social_handle}`} onClick={onHide} className="d-flex flex-column align-items-start text-decoration-none text-dark">
                                        <span className="fw-bold d-none d-sm-block"><small>{data.social_handle}</small></span>
                                        <span className="fw-bold d-sm-none">
                                            <small>{data?.social_handle && (data.social_handle.length > 15 ? data.social_handle.slice(0, 15) + '...' : data.social_handle)}</small>
                                        </span>

                                        <span className="d-none d-sm-block">{data.username}</span>
                                        <span className="d-sm-none">
                                            {data?.username && (data.username.length > 15 ? data.username.slice(0, 15) + '...' : data.username)}
                                        </span>
                                    </Link>
                                </div>

                                {data.id != userId && (
                                    <FollowButton
                                        initialIsFollowing={data.isfollowing}
                                        followedId={data.id}
                                        userId={userId}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">Nenhum resultado encontrado.</p>
                )}
            </Modal.Body>
        </Modal>
    );
};