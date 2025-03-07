import React from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import FollowButton from "../FollowButton";
import { Link } from "react-router-dom";

export default ({ show, onHide, datas, userId }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Likes</Modal.Title>
            </Modal.Header>

            <Modal.Body className="modal-list">
                {datas.length > 0 && (
                    <div className="d-flex flex-column">
                        {datas.map((data) => (
                            <div key={data.id} className="d-flex align-items-center justify-content-between p-2 modal-line">
                                <div className="d-flex align-items-center gap-3">
                                    {data.picture ? (
                                        <img src={data.picture} alt="Profile Picture" className="dropdown-picture" />
                                    ) : (
                                        <FontAwesomeIcon icon={faUserCircle} size="2x" />
                                    )}
                                    <Link to={`/user/${data.social_handle}`} className="text-decoration-none text-dark">
                                        <span>{data.username}</span>
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
                )}
            </Modal.Body>
        </Modal>
    );
};