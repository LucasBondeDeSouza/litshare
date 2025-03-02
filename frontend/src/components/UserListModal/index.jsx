import React from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import FollowButton from "../FollowButton";
import { Link } from "react-router-dom";

export default ({ show, onHide, titleModal, datas, userId }) => {

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{titleModal}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {datas.length > 0 && (
                    <div className="d-flex flex-column">
                        {datas.map((data) => (
                            <div key={data.id} className="d-flex align-items-center justify-content-between p-2 modal-line">
                                <div className="d-flex align-items-center gap-2">
                                    {data.picture ? (
                                        <img src={data.picture} alt="Profile Picture" className="dropdown-picture" />
                                    ) : (
                                        <FontAwesomeIcon icon={faUserCircle} size="2x" />
                                    )}
                                    <Link to={`/user/${data.social_handle}`} onClick={onHide} className="d-flex flex-column align-items-start text-decoration-none text-dark">
                                        <span className="fw-bold"><small>{data.social_handle}</small></span>
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
    )
}