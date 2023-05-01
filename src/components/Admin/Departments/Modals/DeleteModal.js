import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../../../contexts/AlertProvider";
import { deleteDepartment } from "../../../../services/DepartmentService";
import { Button, Modal } from "react-bootstrap";

const DeleteModal = ({ show, onHide, departmentId }) => {
    const navigate = useNavigate();
    const { handleSuccess, handleFailure, setMessage } = useAlert();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: () => deleteDepartment(departmentId),
        onSuccess: (res) => {
            queryClient
                .invalidateQueries(["departments"], {
                    exact: true,
                })
                .then(() => {
                    setMessage(`Department deleted!`);
                    handleSuccess();
                    navigate("/management/departments");
                });
        },
        onError: (err) => {
            setMessage(err.data.message);
            handleFailure();
        },
    });

    const handleDelete = () => mutation.mutate();

    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Department</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-danger fs-4">Danger! </p>
                <p className="text-danger fs-6">
                    Every members in this department will be detached!
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDelete}>
                    Confirm
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
