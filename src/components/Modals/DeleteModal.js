import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlert } from "../../contexts/AlertProvider";

const DeleteModal = (props) => {
    const {
        deleteFn,
        invalidateQueries,
        id,
        title,
        message,
        onHide,
        show,
    } = props;

    const { handleSuccess, handleFailure, setMessage } = useAlert();
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: (id) => deleteFn(id),
        onSuccess: (data) => {
            queryClient
                .invalidateQueries(invalidateQueries)
                .then(() => {
                    onHide();
                    setMessage(data.data.message ?? "Successfully deleted!");
                    handleSuccess();
                });
        },
        onError: (error) => {
            onHide();
            setMessage(error.response?.data?.message);
            handleFailure();
        },
    });

    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="danger"
                    disabled={isLoading}
                    onClick={() => {
                        mutate(id);
                    }}
                >
                    Confirm{" "}
                    {isLoading && (
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    )}
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
