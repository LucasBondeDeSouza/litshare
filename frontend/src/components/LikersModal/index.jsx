import React from "react";
import { Modal, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

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
                                    <span>{liker.username}</span>
                                </div>

                                {liker.id != userId && (
                                    <Button 
                                        size="sm" 
                                        variant={liker.isfollowing ? "outline-primary" : "primary"} 
                                        disabled={liker.isfollowing} 
                                    >
                                        {liker.isfollowing ? "Following" : "Follow"}
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Ninguém Curtiu esse Livro ainda.</p>
                )}
            </Modal.Body>
        </Modal>
    )
}