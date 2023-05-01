import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import {
    deleteDepartment,
    getAllDepartments,
} from "../../services/DepartmentService";
import TrashButton from "../../components/Buttons/TrashButton";
import { Button, Col, Row } from "react-bootstrap";
import SearchBar from "../../components/SearchBar/SearchBar";
import LoadingIndicator from "../../components/Indicator/LoadingIndicator";
import DepartmentTable from "../../components/Tables/DataTable";
import EditButton from "../../components/Buttons/EditButton";
import { Link } from "react-router-dom";

const DepartmentManagement = () => {
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

    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Department Name",
                accessor: "name",
            },
            {
                Header: "Coordinator",
                accessor: (row) => row?.coordinator?.name ?? "Not Assigned",
                id: "coordinator",
            },
            {
                Header: "Coordinator Email",
                accessor: (row) => row?.coordinator?.email ?? "",
                id: "coordinator_email",
            },
            {
                Header: "Members",
                accessor: "number_of_members",
            },
            {
                id: "actions",
                Cell: ({ row }) => (
                    <div onClick={(e) => e.stopPropagation()}>
                        <EditButton
                            id={row.original.id}
                            resourceType="department"
                            action="Update"
                            variant="outline-warning"
                        />

                        <TrashButton
                            id={row.original.id}
                            title="Delete Department"
                            message={
                                <>
                                    <p className="text-danger fs-4">Danger! </p>
                                    <p className="text-danger fs-6">
                                        Every members in{" "}
                                        <b>{row.original.name}</b> will be
                                        detached!
                                    </p>
                                </>
                            }
                            invalidateQueries={["departments"]}
                            deleteFn={deleteDepartment}
                        />
                    </div>
                ),
            },
        ],
        []
    );

    const dataArray = useMemo(() => departments, [departments]);

    return (
        <>
            {isError && (
                <div className="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-5">
                    Something go terribly wrong!
                </div>
            )}
            <Row className="mt-4">
                <Col className="d-flex justify-content-end">
                    <SearchBar />
                    <Button
                        variant="success"
                        className="ms-5"
                        as={Link}
                        to="create"
                    >
                        Add Department
                    </Button>
                </Col>
            </Row>
            <Row className="mt-5">
                {isLoading ? (
                    <LoadingIndicator />
                ) : (
                    <DepartmentTable columns={columns} dataArray={dataArray} />
                )}
            </Row>
        </>
    );
};

export default DepartmentManagement;
