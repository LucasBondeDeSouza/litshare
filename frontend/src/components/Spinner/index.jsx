import React from "react";
import { Spinner } from "react-bootstrap";

export default ({ loading }) => {
    return (
        <>
            {loading && (
                <Spinner animation="border" variant="light" size="sm" role="status">
                    <span className="visually-hidden"></span>
                </Spinner>
            )}
        </>
    );
};