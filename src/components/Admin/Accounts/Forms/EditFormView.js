import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FcBusinessman } from "react-icons/fc";
import { Link, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../../../services/AccountService";
import { getAllDepartments } from "../../../../services/DepartmentService";
import { Controller, useForm } from "react-hook-form";
import ShadowedCard from "../../../Cards/Card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingIndicator from "../../../Indicator/LoadingIndicator";
import ErrorIndicator from "../../../Indicator/ErrorIndicator";
import { yupResolver } from "@hookform/resolvers/yup";
import GenderRadio from "../Radios/GenderRadio";
import { FaArrowLeft, FaPen } from "react-icons/fa";
import { dateFormatter } from "../../../../utils/common";
import {
    genderOptions,
    roleOptions,
} from "../../../../dictionaries/Dictionaries";
import { useAlert } from "../../../../contexts/AlertProvider";

const EditFormView = ({ schema }) => {
    const { accId } = useParams();
    const accountId = parseInt(accId);

    const {
        isLoading,
        isError,
        error,
        data: account,
    } = useQuery({
        queryKey: ["accounts", accountId],
        queryFn: async () => {
            const response = await getUserById(accountId);
            return response.data;
        },
        staleTime: Infinity,
    });

    return (
        <Row className="d-flex justify-content-center">
            <Col xs={6}>
                <ShadowedCard
                    children={
                        <>
                            {isLoading ? (
                                <LoadingIndicator />
                            ) : isError ? (
                                <ErrorIndicator message={error.message} />
                            ) : (
                                <EditForm account={account} schema={schema} />
                            )}
                        </>
                    }
                />
            </Col>
        </Row>
    );
};

const EditForm = ({ account, schema }) => {
    const { accId } = useParams();
    const [updateForm, setUpdateForm] = useState(false);

    const { value: gender } = genderOptions.find(
        (option) => account?.gender === option.label
    );

    const {
        control,
        handleSubmit,
        getValues,
        setValue,
        formState: { isSubmitting, isDirty },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        reValidateMode: "onChange",
        defaultValues: {
            last_name: account?.last_name,
            first_name: account?.first_name,
            dob: account?.dob,
            gender: gender,
            email: account?.email,
            role: account?.role,
            department_id: account?.department_id,
        },
    });

    const selectedRole = getValues("role");

    const { handleSuccess, handleFailure, setMessage } = useAlert();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (body) => updateUser(accId, body),
        onSuccess: (res) => {
            queryClient
                .invalidateQueries(["accounts"], {
                    exact: true,
                })
                .then(() => {
                    setMessage(`Account updated!`);
                    handleSuccess();
                    setUpdateForm(!updateForm);
                });
        },
        onError: (err) => {
            setMessage("Somehting wrong, please try again later!");
            handleFailure();
        },
    });

    const onSubmit = async (data) => {
        const request = {
            last_name: data.last_name,
            first_name: data.first_name,
            email: data.email,
            role: data.role,
            dob: data.dob,
            gender: parseInt(data.gender),
            department_id: data.department_id,
        };
        console.log(request);
        
        // try {
        //     const result = await mutation.mutateAsync(request);
        //     return result.data

        // } catch (err) {
        //     console.log("catch run");
        //     console.error("Submit Error: ", err);
        //     console.log("Err Response = ", err.response)
        //     if (err.response.status >= 400) {
        //         setError("root.serverError", {
        //             type: err.response.status,
        //             message: err.response.data.message,
        //         });
        //     }
        //     throw err;
        // }

        return mutation.mutateAsync(request).catch((err) => {
            console.log(err)
            if (err.response.status >= 400) {
                setMessage(err.response.data.message);
                    handleFailure();
            }
            throw err
        })

        // return mutation.mutateAsync(request).catch((err) => {
        //     console.log("catch run")
        //     console.error("Submit Error: ", err);
        //     if (err.response.status >= 400) {
        //         setError("root.serverError", {
        //             type: err.response.status,
        //             message: err.response.data.message,
        //         });
        //     }
        //     throw err;
        // });

    };

    const toggleEdit = () => {
        setUpdateForm(!updateForm);
    };

    return (
        <>
            <Row className="mb-3">
                <Col>
                    <div className="position relative">
                        <Link
                            className="text-muted "
                            to={".."}
                            style={{ position: "absolute", top: 10, left: 10 }}
                        >
                            <FaArrowLeft className="me-2" />
                            Return
                        </Link>
                        <FcBusinessman
                            fontSize="120px"
                            className="d-block mx-auto"
                        />
                        {!updateForm && (
                            <FaPen
                                style={{
                                    position: "absolute",
                                    top: 10,
                                    right: 10,
                                }}
                                onClick={toggleEdit}
                                className="text-muted clickable"
                            />
                        )}
                    </div>
                </Col>
            </Row>

            {account ? (
                updateForm ? (
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name:</Form.Label>
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
                                            type="text"
                                            placeholder="Last name"
                                            isInvalid={invalid}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {error?.message}
                                        </Form.Control.Feedback>
                                    </>
                                )}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>First Name:</Form.Label>
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
                                            type="text"
                                            placeholder="First name"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {error?.message}
                                        </Form.Control.Feedback>
                                    </>
                                )}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email:</Form.Label>
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
                                            placeholder="Email"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {error?.message}
                                        </Form.Control.Feedback>
                                    </>
                                )}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date Of Birth:</Form.Label>
                            <Controller
                                name="dob"
                                control={control}
                                render={({
                                    field,
                                    fieldState: { invalid, error },
                                }) => (
                                    <>
                                        <Form.Control {...field} type="date" />
                                        <Form.Control.Feedback type="invalid">
                                            {error?.message}
                                        </Form.Control.Feedback>
                                    </>
                                )}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Gender:</Form.Label>
                            <div className="d-block">
                                <GenderRadio
                                    control={control}
                                    setValue={setValue}
                                    defaultGender={gender}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Role:</Form.Label>

                            <Controller
                                name="role"
                                control={control}
                                render={({
                                    field,
                                    fieldState: { invalid, error },
                                }) => (
                                    <>
                                        <Form.Select
                                            {...field}
                                            placeholder="Role"
                                        >
                                            {roleOptions.map((option) => (
                                                <option
                                                    value={option.value}
                                                    key={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {error?.message}
                                        </Form.Control.Feedback>
                                    </>
                                )}
                            />
                        </Form.Group>

                        {selectedRole !== "manager" && (
                            <DepartmentSelect control={control} />
                        )}

                        <div className="d-flex justify-content-end mt-5 gap-3">
                            <Button variant="secondary" onClick={toggleEdit}>
                                Cancel
                            </Button>
                            <Button
                                variant="success"
                                type="submit"
                                disabled={isSubmitting || !isDirty}
                            >
                                Save
                            </Button>
                        </div>
                    </Form>
                ) : (
                    <>
                        <Row>
                            <Col className="text-start fw-semibold">
                                <p>ID:</p>
                                <p>Last Name:</p>
                                <p>First Name:</p>
                                <p>Date of Birth: </p>
                                <p>Gender: </p>
                                <p>Email: </p>
                                <p>Role: </p>
                                <p>Department:</p>
                            </Col>
                            <Col className="text-end">
                                <p>{account.id}</p>
                                <p className="text-capitalize">
                                    {account.last_name}
                                </p>
                                <p className="text-capitalize">
                                    {account.first_name}
                                </p>
                                <p>{dateFormatter(account.dob, "en-UK")}</p>
                                <p>{account.gender}</p>
                                <p>{account.email}</p>
                                <p className="text-capitalize">
                                    {account.role}
                                </p>
                                <p className="text-capitalize">
                                    {account.department != null
                                        ? account.department
                                        : "Not Assigned"}
                                </p>
                            </Col>
                        </Row>
                    </>
                )
            ) : null}
        </>
    );
};

const DepartmentSelect = ({ control }) => {
    const {
        isLoading,
        isError,
        data: departments,
    } = useQuery({
        queryKey: ["departments"],
        queryFn: async () => {
            const response = await getAllDepartments();
            return response.data;
        },
    });

    return (
        <>
            {isLoading ? (
                <p className="text-info">Loading Departments...</p>
            ) : isError ? (
                <p className="text-dander">
                    Error loading departments, please try again later!
                </p>
            ) : (
                <Form.Group className="mb-3">
                    <Form.Label>Department:</Form.Label>

                    <Controller
                        name="department_id"
                        control={control}
                        render={({ field, fieldState: { invalid, error } }) => (
                            <>
                                <Form.Select {...field} placeholder="Role">
                                    {departments.map((department) => (
                                        <option
                                            value={department.id}
                                            key={department.id}
                                        >
                                            {department.name}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {error?.message}
                                </Form.Control.Feedback>
                            </>
                        )}
                    />
                </Form.Group>
            )}
        </>
    );
};

export default EditFormView;
