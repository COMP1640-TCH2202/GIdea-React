import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    getDepartmentDetail,
    removeMemberFromDepartment,
    updateDepartment,
} from "../../../../services/DepartmentService";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlert } from "../../../../contexts/AlertProvider";
import { Button, Col, Form, Row, Spinner, Stack } from "react-bootstrap";
import { FaArrowLeft, FaPlus, FaTrashAlt } from "react-icons/fa";
import CoordinatorSelect from "../Selects/CoordinatorSelect";
import ErrorIndicator from "../../../Indicator/ErrorIndicator";
import LoadingIndicator from "../../../Indicator/LoadingIndicator";
import TrashButton from "../../../Buttons/TrashButton";
import MemberDataTable from "../../../Tables/DataTable";
import AddMemberModal from "../Modals/AddMemberModal";
import ConfirmDeleteModal from "../Modals/DeleteModal";

const EditFormView = ({ schema }) => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { deptId } = useParams();
    const departmentId = parseInt(deptId);

    const handleShowModal = () => setShowModal(!showModal);
    const handleShowDeleteModal = () => setShowDeleteModal(!showDeleteModal);

    const {
        isLoading,
        isFetching,
        isError,
        error,
        data: department,
    } = useQuery({
        queryKey: ["departments", departmentId],
        queryFn: async () => {
            const response = await getDepartmentDetail(departmentId);
            return response.data;
        },
        staleTime: Infinity,
    });

    return (
        <>
            <Row className="d-flex justify-content-center">
                {isLoading ? (
                    <LoadingIndicator />
                ) : isError ? (
                    <ErrorIndicator message={error.message} />
                ) : (
                    <>
                        <Col xs={9}>
                            <MembersTable department={department} />
                        </Col>
                        <Col xs={3} className="d-flex flex-column">
                            <Stack>
                                <div className="d-flex">
                                    <Button
                                        variant="success"
                                        size="sm"
                                        onClick={handleShowModal}
                                        className="fs-6 text flex-grow-1"
                                    >
                                        <FaPlus
                                            style={{
                                                position: "relative",
                                                bottom: 1,
                                            }}
                                        />{" "}
                                        <span className="ms-1">
                                            Add Members
                                        </span>
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={handleShowDeleteModal}
                                        className="ms-3"
                                    >
                                        <FaTrashAlt />
                                    </Button>
                                </div>
                                <hr className="my-3" />
                                {isFetching ? (
                                    <LoadingIndicator />
                                ) : (
                                    <EditForm
                                        departmentId={departmentId}
                                        initialData={department}
                                        schema={schema}
                                    />
                                )}
                            </Stack>
                        </Col>
                    </>
                )}
            </Row>

            <AddMemberModal
                show={showModal}
                onHide={handleShowModal}
                department={department}
            />

            <ConfirmDeleteModal
                show={showDeleteModal}
                onHide={handleShowDeleteModal}
                departmentId={departmentId}
            />
        </>
    );
};

const EditForm = ({ initialData, schema, departmentId }) => {
    const {
        control,
        handleSubmit,
        setError,
        reset,
        trigger,
        formState: { isSubmitting, isDirty },
    } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema),
        reValidateMode: "onChange",
        defaultValues: {
            name: initialData?.name,
            coordinator: initialData?.coordinator && {
                value: initialData.coordinator.id,
                label: initialData.coordinator.name,
                isDisabled: false,
            },
        },
    });

    const { handleSuccess, handleFailure, setMessage } = useAlert();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (body) => updateDepartment(departmentId, body),
        onSuccess: (res) => {
            queryClient
                .invalidateQueries(["departments"], {
                    exact: true,
                })
                .then(() => {
                    setMessage(`Department updated!`);
                    handleSuccess();
                });
        },
    });

    const onSubmit = (data) => {
        const request = {
            name: data?.name,
            coordinator_id: data?.coordinator?.value,
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
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Label>
                    Department Name{" "}
                    <span className="text-muted">(Required)</span>
                </Form.Label>
                <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
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
                    departmentId={departmentId}
                    validationTrigger={trigger}
                />
            </Form.Group>

            <div className="d-flex justify-content-between mt-4">
                <Link className="text-muted " to={".."}>
                    <FaArrowLeft className="me-2" />
                    Return
                </Link>
                <Button
                    type="submit"
                    variant="success"
                    disabled={!isDirty || isSubmitting}
                >
                    Update{" "}
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
    );
};

const MembersTable = ({ department }) => {
    const memberList = department?.members;
    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Member Name",
                accessor: (row) => `${row.last_name} ${row.first_name}`,
                id: "name",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Ideas",
                accessor: "ideas_count",
            },
            {
                id: "actions",
                Cell: ({ row }) => (
                    <div onClick={(e) => e.stopPropagation()}>
                        <TrashButton
                            id={row.original.id}
                            title="Removing staff"
                            message={
                                <>
                                    Remove <b>{row.values.name}</b> from{" "}
                                    <b>{department?.name}?</b>
                                </>
                            }
                            invalidateQueries={["departments"]}
                            deleteFn={removeMemberFromDepartment}
                        />
                    </div>
                ),
            },
        ],
        [department]
    );

    const dataArray = useMemo(() => memberList, [memberList]);

    return <MemberDataTable columns={columns} dataArray={dataArray} />;
};

export default EditFormView;
