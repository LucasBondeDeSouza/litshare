import React from "react";
import { Button, Modal } from "react-bootstrap";

export default ({ show, onClose, onConfirm, title }) => {

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Exclusão</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Tem certeza de que deseja excluir o livro <strong>{title}</strong>? Essa ação não pode ser desfeita.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                <Button variant="danger" onClick={onConfirm}>Excluir</Button>
            </Modal.Footer>
        </Modal>
    )
}