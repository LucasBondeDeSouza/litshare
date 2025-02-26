import React from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import FollowButton from "../FollowButton";
import { Link } from "react-router-dom";

export default ({ show, onHide, likers, userId }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Likes</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {likers.length > 0 ? (
                    <div className="d-flex flex-column">
                        {likers.map((liker) => (
                            <div key={liker.id} className="d-flex align-items-center justify-content-between p-2 modal-line">
                                <div className="d-flex align-items-center gap-3">
                                    {liker.picture ? (
                                        <img src={liker.picture} alt="Profile Picture" className="dropdown-picture" />
                                    ) : (
                                        <FontAwesomeIcon icon={faUserCircle} size="2x" />
                                    )}
                                    <Link to={`/user/${liker.social_handle}`} className="text-decoration-none text-dark">
                                        <span>{liker.username}</span>
                                    </Link>
                                </div>

                                {liker.id !== userId && (
                                    <FollowButton
                                        initialIsFollowing={liker.isfollowing}
                                        followedId={liker.id}
                                        userId={userId}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Ninguém curtiu esse livro ainda.</p>
                )}
            </Modal.Body>
        </Modal>
    );
};