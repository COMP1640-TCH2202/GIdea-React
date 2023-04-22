import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useAlert } from "../../../contexts/AlertProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDepartment } from "../../../services/DepartmentService";
import { Button, Col, Form, Row, Spinner, Stack } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getUsersBy } from "../../../services/AccountService";

const schema = yup.object({
    name: yup
        .string()
        .trim()
        .required("Please provide a name for this department")
        .matches(/^[A-z ]+$/, "Invalid Name")
        .max(30, "Try choosing a shorter name"),
});

const CreateDepartment = () => {
    const {
        control,
        handleSubmit,
        setError,
        reset,
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
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (department) => createDepartment(department),
        onSuccess: (res) => {
            console.log("mutation success: ", res)
            queryClient
                .invalidateQueries(["departments"], { exact: true })
                .then(() => {
                    setMessage(`Department ${res?.data?.name} is created`);
                    handleSuccess();
                });
        },
    });

    const onSubmit = (data) => {
        const request = {
            name: data?.name,
            coordinator_id: data?.coordinator?.value,
            members: data?.members?.map((member) => member.value),
        };
        console.log(request);

        return mutation
            .mutateAsync(request)
            .then((res) => {
                reset();
            })
            .catch((err) => {
                console.log("Submit Error: ", err)
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

const CoordinatorSelect = (props) => {
    const filterCoordinator = async (inputValue: string) => {
        const options = [];
        try {
            const result = await getUsersBy({ idleMembers: "coordinator" });
            result.data.map((coordinator) =>
                options.push({
                    value: coordinator.id,
                    label: `${coordinator.last_name} ${coordinator.first_name}`,
                })
            );
        } catch (error) {
            props.setMessage("Can't get Coordinator data at the moment!");
            props.handleFailure();
        }
        return options.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const loadCoordinatorOptions = (inputValue: string) =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(filterCoordinator(inputValue));
            }, 700);
        });

    return (
        <Controller
            name="coordinator"
            control={props.control}
            render={({ field, fieldState: { invalid, error } }) => (
                <AsyncSelect
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    cacheOptions
                    defaultOptions
                    loadOptions={loadCoordinatorOptions}
                    isClearable={true}
                    placeholder="Assign a Coordinator"
                />
            )}
        />
    );
};

const MembersSelect = (props) => {
    const filterMembers = async (inputValue: string) => {
        const options = [];
        try {
            const result = await getUsersBy({ idleMembers: "staff" });
            result.data.map((staff) =>
                options.push({
                    value: staff.id,
                    label: `${staff.last_name} ${staff.first_name} (ID: ${staff.id})`,
                })
            );
        } catch (error) {
            props.setMessage("Can't get Staff data at the moment!");
            props.handleFailure();
        }
        return options.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const loadMemberOptions = (inputValue: string) =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(filterMembers(inputValue));
            }, 700);
        });

    return (
        <Controller
            name="members"
            control={props.control}
            render={({ field, fieldState: { invalid, error } }) => (
                <AsyncSelect
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    isMulti
                    cacheOptions
                    defaultOptions
                    loadOptions={loadMemberOptions}
                    isClearable={true}
                    placeholder="Add Staffs to department"
                />
            )}
        />
    );
};

export default CreateDepartment;
