import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../../services/CategoryService";
import { useAlert } from "../../contexts/AlertProvider";

const DeleteModal = (props) => {
    const { handleSuccess, handleFailure, setMessage } = useAlert();
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: (id) => deleteCategory(id),
        onSuccess: (data) => {
            queryClient
                .invalidateQueries(["categories"], { exact: true })
                .then(() => {
                    props.onHide()
                    setMessage(data?.data?.message);
                    handleSuccess();
                });
        },
        onError: (error) => {
            props.onHide();
            setMessage(error.response?.data?.message);
            handleFailure();
        },
    });

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete {props.resourceType}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>
                    Confirm delete {props.resourceName} {props.id}
                </h4>
                <p>You are about to delete the above resource, are you sure?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="danger"
                    disabled={isLoading}
                    onClick={() => {
                        mutate(props.id);
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
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
