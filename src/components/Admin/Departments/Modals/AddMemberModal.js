import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useAlert } from "../../../../contexts/AlertProvider";
import { addMember } from "../../../../services/DepartmentService";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import MembersSelect from "../Selects/MembersSelect";

const AddMemberModal = ({ show, onHide, department }) => {
    const {
        control,
        handleSubmit,
        reset,
        setError,
        formState: { isSubmitting, isValid },
    } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: { members: [] },
    });

    const { handleSuccess, handleFailure, setMessage } = useAlert();
    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation({
        mutationFn: (body) => addMember(department?.id, body),
        onSuccess: (res) => {
            queryClient.invalidateQueries(["departments"]).then(() => {
                onHide();
                reset();
                setMessage(`Added ${res.data?.rows_affected} members!`);
                handleSuccess();
            });
        },
    });

    const onSubmit = (data) => {
        const request = {
            members: data?.members?.map((member) => member.value),
        };
        return mutateAsync(request).catch((err) => {
            console.error("Submit Error: ", err);
            if (err.response.status === 400) {
                setError("root.serverError", {
                    type: err.response.status,
                    message: err.response.data.message,
                });
            }
            setError("name", {
                message: err.response.data.message,
            });
        });
    };

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
                    Add members to {department?.name}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <MembersSelect
                            control={control}
                            handleFailure={handleFailure}
                            setMessage={setMessage}
                            require={true}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="success"
                        disabled={!isValid || isSubmitting}
                    >
                        Add{" "}
                        {isSubmitting && (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        )}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddMemberModal;
