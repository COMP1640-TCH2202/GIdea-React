import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlert } from "../../../../contexts/AlertProvider";
import { Button, Col, Form, Row, Spinner, Stack } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import CoordinatorSelect from "../Selects/CoordinatorSelect";
import MembersSelect from "../Selects/MembersSelect";
import { createDepartment } from "../../../../services/DepartmentService";

const CreateFormView = ({ schema }) => {
    const {
        control,
        handleSubmit,
        setError,
        reset,
        trigger,
        formState: { isSubmitting },
    } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema),
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            coordinator: null,
            members: [],
        },
    });

    const { handleSuccess, handleFailure, setMessage } = useAlert();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (department) => createDepartment(department),
        onSuccess: (res) => {
            queryClient
                .invalidateQueries(["departments"], { exact: true })
                .then(() => {
                    setMessage(`Department created`);
                    handleSuccess();
                    navigate("/management/departments");
                });
        },
    });

    const onSubmit = (data) => {
        const request = {
            name: data?.name,
            coordinator_id: data?.coordinator?.value,
            members: data?.members?.map((member) => member.value),
        };
        return mutation
            .mutateAsync(request)
            .then((res) => {
                reset();
            })
            .catch((err) => {
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
        <>
            <Row className="d-flex justify-content-center">
                <Col xs={6}>
                    <Stack>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Department Name{" "}
                                    <span className="text-muted">
                                        (Required)
                                    </span>
                                </Form.Label>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({
                                        field,
                                        fieldState: { invalid, error },
                                    }) => (
                                        <>
                                            <Form.Control
                                                {...field}
                                                id="name"
                                                value={field.value}
                                                onChange={field.onChange}
                                                isInvalid={invalid}
                                                placeholder="e.g. Marketing, Human Resource, etc."
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {error?.message}
                                            </Form.Control.Feedback>
                                        </>
                                    )}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Coordinator</Form.Label>
                                <CoordinatorSelect
                                    control={control}
                                    handleFailure={handleFailure}
                                    setMessage={setMessage}
                                    validationTrigger={trigger}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Members</Form.Label>
                                <MembersSelect
                                    control={control}
                                    handleFailure={handleFailure}
                                    setMessage={setMessage}
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-between mt-3">
                                <Link className="text-muted " to={".."}>
                                    <FaArrowLeft className="me-2" />
                                    Return
                                </Link>
                                <Button
                                    type="submit"
                                    variant="success"
                                    disabled={isSubmitting}
                                >
                                    Create{" "}
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
                            </div>
                        </Form>
                    </Stack>
                </Col>
            </Row>
        </>
    );
};

export default CreateFormView;
