import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default ({ username, picture }) => {

    return (
        <a href="" className="card-profile d-flex align-items-center text-decoration-none text-dark gap-2">
            {picture ? (
                <img className="card-picture-profile" src={picture} alt={username} />
            ) : (
                <FontAwesomeIcon icon={faUserCircle} className="card-picture-alternative" />
            )}
            <p className="fw-bolder m-0">{username}</p>
        </a>
    );
}