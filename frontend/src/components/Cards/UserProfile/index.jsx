import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default ({ username, social_handle, picture }) => {

    return (
        <Link to={`/user/${social_handle}`} className="card-profile d-flex align-items-start text-decoration-none text-dark gap-2">
            {picture ? (
                <img className="card-picture-profile" src={picture} alt={username} />
            ) : (
                <FontAwesomeIcon icon={faUserCircle} className="card-picture-alternative" />
            )}

            <div className="d-flex gap-2">
                <p className="fw-bolder m-0">
                    {username.length + social_handle.length > 21 ? (
                        <span>
                            {username.length > 15 ? `${username.slice(0, 15)}...` : username}
                            <small className="fw-normal"> {social_handle.length > 5 ? `${social_handle.slice(0, 5)}...` : social_handle}</small>
                        </span>
                    ) : (
                        <span>{username} <small className="fw-normal">{social_handle}</small></span>
                    )}
                </p>
            </div>
        </Link>
    );
}