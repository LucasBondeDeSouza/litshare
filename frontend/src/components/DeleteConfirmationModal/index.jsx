import React from "react";
import { Button, Modal } from "react-bootstrap";

export default ({ show, onClose, onConfirm, title }) => {

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton className="bg-danger text-white">
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Are you sure you want to delete the book <strong>{title}</strong>? This action cannot be undone.
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="danger" onClick={onConfirm}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}