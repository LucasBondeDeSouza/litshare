import React from "react";

export default () => {

    return (
        <div className="skeleton-card align-items-start">
            <div className="d-flex align-items-center gap-2">
                <div className="skeleton-picture"></div>
                <div className="skeleton-name"></div>
            </div>
            <div className="skeleton-image"></div>
            <div className="d-flex justify-content-between align-items-center pt-1 w-100">
                <div className="skeleton-title"></div>
                <div className="skeleton-text"></div>
            </div>
        </div>
    )
}