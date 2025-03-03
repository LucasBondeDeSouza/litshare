import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default ({ input, datas, handleClick }) => {
    return (
        input.length > 0 && datas.length > 0 && (
            <div className="list-group position-absolute w-100">
                {datas.map((data) => (
                    <div key={data.id} onClick={() => handleClick(data.social_handle || data.title)} className="list-group-line d-flex justify-content-between align-items-center p-2">
                        {data.title ? (
                            <div className="d-flex align-items-center gap-2">
                                {data.cover ? (
                                    <img src={data.cover} alt={data.title} />
                                ): (
                                    <img src={`https://covers.openlibrary.org/b/id/${data.cover_i}-L.jpg`} alt={data.title} />
                                )}
                                
                                <span>{data.title} by {data.author_name}</span>
                            </div>
                        ) : (
                            <div className="d-flex align-items-center gap-2">
                                {data.picture ? (
                                    <img src={data.picture} alt="" className="list-picture" />
                                ) : (
                                    <FontAwesomeIcon icon={faUserCircle} size="2x" />
                                )}
                                <div className="d-flex flex-column align-items-start">
                                    <span className="fw-bold"><small>{data.social_handle}</small></span>
                                    <span>{data.username}</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )
    );
};