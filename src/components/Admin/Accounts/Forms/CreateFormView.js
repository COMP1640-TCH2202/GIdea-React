import React from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { createUser } from "../../../../services/AccountService";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlert } from "../../../../contexts/AlertProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import GenderRadio from "../Radios/GenderRadio";
import DobSelect from "../Selects/DobSelect";
import RoleRadio from "../Radios/RoleRadio";
import DepartmentSelect from "../Selects/DepartmentSelect";

const CreateFormView = ({ schema }) => {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        setValue,
        setError,
        reset,
        trigger,
        watch,
        formState: { isSubmitting },
    } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema),
        reValidateMode: "onChange",
        defaultValues: {
            last_name: "",
            first_name: "",
            gender: "",
            dob: "",
            email: "",
            role: "",
            department_id: "",
        },
    });

    const { handleSuccess, handleFailure, setMessage } = useAlert();

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (user) => createUser(user),
        onSuccess: (res) => {
            queryClient.invalidateQueries(["accounts"], { exact: true });
            queryClient.invalidateQueries(["departments"]);
        },
    });

    const onSubmit = (data) => {
        const request = {
            last_name: data.last_name,
            first_name: data.first_name,
            email: data.email,
            role: data.role,
            dob: data.dob,
            gender: data.gender,
            department_id: data.department_id.value,
        };
        console.log(request);
        return mutation
            .mutateAsync(request)
            .then((res) => {
                reset();
                setMessage(`New account was created`);
                handleSuccess();
                navigate("/management/accounts");
            })
            .catch((err) => {
                console.error("Submit error: ", err);
                if (err.response.status === 400) {
                    setError("root.serverError", {
                        type: err.response.status,
                        message: err.response.data.message,
                    });
                }
            });
    };

    const handleReturn = () => navigate("/management/accounts");

    return (
        <>
            <Row className="d-flex justify-content-center">
                <Col xs={6}>
                    <Form
                        onSubmit={handleSubmit(onSubmit)}
                        className="p-3 d-grid gap-3"
                    >
                        <Row>
                            <Form.Group as={Col} xs={6}>
                                <Form.Label className="fw-semibold">
                                    Last Name:
                                </Form.Label>

                                <Controller
                                    name="last_name"
                                    control={control}
                                    render={({
                                        field,
                                        fieldState: { invalid, error },
                                    }) => (
                                        <>
                                            <Form.Control
                                                {...field}
                                                placeholder="Enter last name"
                                                id="last_name"
                                                value={field.value}
                                                onChange={field.onChange}
                                                isInvalid={invalid}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {error?.message}
                                            </Form.Control.Feedback>
                                        </>
                                    )}
                                />
                            </Form.Group>
                            <Form.Group as={Col} xs={6}>
                                <Form.Label className="fw-semibold">
                                    First Name:
                                </Form.Label>
                                <Controller
                                    name="first_name"
                                    control={control}
                                    render={({
                                        field,
                                        fieldState: { invalid, error },
                                    }) => (
                                        <>
                                            <Form.Control
                                                {...field}
                                                placeholder="Enter first name"
                                                id="first_name"
                                                value={field.value}
                                                onChange={field.onChange}
                                                isInvalid={invalid}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {error?.message}
                                            </Form.Control.Feedback>
                                        </>
                                    )}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Label className="fw-semibold">
                                Gender:
                            </Form.Label>
                            <GenderRadio
                                control={control}
                                setValue={setValue}
                                trigger={trigger}
                            />
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label className="fw-semibold">
                                    Date of Birth:
                                </Form.Label>
                                <DobSelect
                                    control={control}
                                    trigger={trigger}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label className="fw-semibold">
                                    Email:
                                </Form.Label>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({
                                        field,
                                        fieldState: { invalid, error },
                                    }) => (
                                        <>
                                            <Form.Control
                                                {...field}
                                                placeholder="e.g: johndoe@example.com"
                                                id="email"
                                                value={field.value}
                                                onChange={field.onChange}
                                                isInvalid={invalid}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {error?.message}
                                            </Form.Control.Feedback>
                                        </>
                                    )}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label className="fw-semibold">
                                    Role:
                                </Form.Label>
                                <RoleRadio
                                    control={control}
                                    setValue={setValue}
                                    trigger={trigger}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label className="fw-semibold">
                                    Department:
                                </Form.Label>

                                <DepartmentSelect
                                    control={control}
                                    setMessage={setMessage}
                                    handleFailure={handleFailure}
                                    trigger={trigger}
                                    disabled={watch("role") === "manager"}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mt-5">
                            <Button
                                variant="success"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {!isSubmitting ? (
                                    "Create Account"
                                ) : (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                )}
                            </Button>
                            <Button
                                className="mt-3"
                                variant="secondary"
                                onClick={handleReturn}
                            >
                                Return
                            </Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default CreateFormView;
